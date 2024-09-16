from flask import render_template, request, redirect, url_for, Response
from datetime import date

def configure_routes(app):

    def get_translations(lang):
        return app.config['TRANSLATIONS'].get(lang)

    def get_localized_urls():
        current_url = request.path  # Use the URL path instead of query parameters
        if '/en/' in current_url:
            cs_url = current_url.replace('/en/', '/cs/')
            en_url = current_url  # Already in English
        else:
            cs_url = current_url  # Already in Czech
            en_url = current_url.replace('/cs/', '/en/')
        return cs_url, en_url

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
        browser_lang = request.accept_languages.best_match(['en', 'cs', 'sk'])
        if browser_lang in ['cs', 'sk']:
            return redirect(url_for("home", lang='cs'))
        return redirect(url_for("home", lang='en'))

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
            "User-agent: *",  # Applies to all user agents
            "Sitemap: https://club-termix.cz/sitemap.xml"  # Link to your sitemap
        ]
        return Response("\n".join(lines), mimetype="text/plain")

    @app.route('/sitemap.xml')
    def sitemap():
        # Redirect to the sitemap in the static folder
        return redirect(url_for('static', filename='sitemap.xml'))
