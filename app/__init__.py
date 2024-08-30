from flask import Flask
from app.translations import load_all_translations
from app.routes import configure_routes


def create_app(config_name=None):
    app = Flask(__name__)

    # Load translations
    translations = load_all_translations()

    # Store translations in the app config
    app.config['TRANSLATIONS'] = translations

    # Configure routes
    configure_routes(app)

    return app
