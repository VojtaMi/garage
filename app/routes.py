from flask import render_template, request, redirect, url_for
from datetime import date

def configure_routes(app):

    def get_translations(lang):
        return app.config['TRANSLATIONS'].get(lang)

    def get_localized_urls():
        current_url = request.full_path
        if 'lang=en' in current_url:
            cs_url = current_url.replace('lang=en', 'lang=cs')
            en_url = current_url  # Already in English
        else:
            cs_url = current_url  # Already in Czech
            en_url = current_url.replace('lang=cs', 'lang=en')
        return cs_url, en_url

    @app.context_processor
    def inject_localized_urls():
        cs_url, en_url = get_localized_urls()
        return dict(cs_url=cs_url, en_url=en_url)

    @app.context_processor
    def inject_current_year():
        return {'current_year': date.today().year}

    def redirect_browser_lang():
        # Czech for Czech and Slovak, else English
        browser_lang = request.accept_languages.best_match(['en', 'cs', 'sk'])
        if browser_lang in ['cs', 'sk']:
            return redirect(url_for("home", lang='cs'))
        return redirect(url_for("home", lang='en'))

    @app.route('/')
    def home():
        lang = request.args.get('lang')
        if not lang:
            return redirect_browser_lang()
        return render_template('index.html', translations=get_translations(lang), lang=lang)

    @app.route('/gallery')
    def gallery():
        lang = request.args.get('lang')
        return render_template('gallery.html', translations=get_translations(lang), lang=lang)

    @app.route('/information')
    def information():
        lang = request.args.get('lang')
        return render_template('information.html', translations=get_translations(lang), lang=lang)

    @app.route('/drink_menu')
    def drink_menu():
        lang = request.args.get('lang')
        return render_template('drink_menu.html', translations=get_translations(lang), lang=lang)

    @app.route('/about')
    def about():
        lang = request.args.get('lang')
        return render_template('about.html', translations=get_translations(lang), lang=lang)

    @app.route('/events')
    def events():
        lang = request.args.get('lang')
        return render_template('events.html', translations=get_translations(lang), lang=lang)
