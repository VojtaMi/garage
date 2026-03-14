from datetime import date
from xml.sax.saxutils import escape

from flask import Response, abort, redirect, render_template, request, send_from_directory, url_for


SUPPORTED_LANGS = ("cs", "en")
SEO_ENDPOINTS = ("home", "contacts", "drink_menu", "events")


def configure_routes(app):

    def get_translations(lang):
        if lang not in SUPPORTED_LANGS:
            abort(404)
        translations = app.config['TRANSLATIONS'].get(lang)
        if translations is None:
            abort(404)
        return translations

    def get_localized_urls():
        endpoint = request.endpoint
        view_args = dict(request.view_args or {})

        if not endpoint or "lang" not in view_args:
            return url_for("home", lang="cs"), url_for("home", lang="en")

        cs_args = {**view_args, "lang": "cs"}
        en_args = {**view_args, "lang": "en"}
        return url_for(endpoint, **cs_args), url_for(endpoint, **en_args)

    def build_sitemap_url(loc, lastmod, priority, alternates=None, changefreq="weekly"):
        alternate_links = ""
        if alternates:
            alternate_links = "".join(
                f'\n    <xhtml:link rel="alternate" hreflang="{lang}" href="{escape(url)}" />'
                for lang, url in alternates.items()
            )

        return (
            "  <url>\n"
            f"    <loc>{escape(loc)}</loc>{alternate_links}\n"
            f"    <lastmod>{lastmod}</lastmod>\n"
            f"    <changefreq>{changefreq}</changefreq>\n"
            f"    <priority>{priority:.1f}</priority>\n"
            "  </url>"
        )

    @app.context_processor
    def inject_localized_urls():
        cs_url, en_url = get_localized_urls()
        return dict(cs_url=cs_url, en_url=en_url)

    @app.context_processor
    def inject_current_year():
        return {'current_year': date.today().year}

    @app.route('/')
    def home_without_lang():
        # Czech for Czech and Slovak, else English
        browser_lang = request.accept_languages.best_match(['en', 'cs', 'sk']) or 'cs'
        target_lang = 'cs' if browser_lang in ['cs', 'sk'] else 'en'
        response = redirect(url_for("home", lang=target_lang), code=302)
        response.headers["Vary"] = "Accept-Language"
        return response

    @app.route('/favicon.ico')
    def favicon_ico():
        return send_from_directory(
            app.static_folder,
            'assets/logos/favicon.ico',
            mimetype='image/vnd.microsoft.icon'
        )

    @app.route('/favicon.png')
    def favicon_png():
        return send_from_directory(
            app.static_folder,
            'assets/logos/favicon-512.png',
            mimetype='image/png'
        )

    @app.route('/apple-touch-icon.png')
    def apple_touch_icon():
        return send_from_directory(
            app.static_folder,
            'assets/logos/apple-touch-icon.png',
            mimetype='image/png'
        )

    @app.route('/<lang>/')
    def home(lang):
        return render_template('index.html', translations=get_translations(lang), lang=lang)

    @app.route('/<lang>/contacts')
    def contacts(lang):
        return render_template('contacts.html', translations=get_translations(lang), lang=lang)

    @app.route('/<lang>/drink_menu')
    def drink_menu(lang):
        return render_template('drink_menu.html', translations=get_translations(lang), lang=lang)


    @app.route('/<lang>/events')
    def events(lang):
        return render_template('events.html', translations=get_translations(lang), lang=lang)

    @app.route('/robots.txt')
    def robots_txt():
        lines = [
            "User-agent: *",
            "Allow: /",
            f"Sitemap: {url_for('sitemap', _external=True)}"
        ]
        return Response("\n".join(lines), mimetype="text/plain")

    @app.route('/sitemap.xml')
    def sitemap():
        lastmod = date.today().isoformat()
        urls = []

        for endpoint in SEO_ENDPOINTS:
            localized_urls = {
                code: url_for(endpoint, lang=code, _external=True)
                for code in SUPPORTED_LANGS
            }
            alternates = {
                "cs": localized_urls["cs"],
                "en": localized_urls["en"],
                "x-default": localized_urls["cs"]
            }

            for lang, loc in localized_urls.items():
                priority = 1.0 if endpoint == "home" and lang == "cs" else 0.9 if endpoint == "home" else 0.8
                urls.append(build_sitemap_url(loc, lastmod, priority, alternates=alternates))

        pdf_url = url_for('static', filename='assets/drink_menu.pdf', _external=True)
        urls.append(build_sitemap_url(pdf_url, lastmod, 0.5, changefreq="monthly"))

        xml = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
            '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
            f'{"\n".join(urls)}\n'
            '</urlset>'
        )
        return Response(xml, mimetype="application/xml")
