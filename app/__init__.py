from flask import Flask
from app.translations import load_all_translations
from app.routes import configure_routes
from datetime import date


def create_app(config_name=None):
    app = Flask(__name__)

    # Load translations
    translations = load_all_translations()

    # Store translations in the app config
    app.config['TRANSLATIONS'] = translations

    # Configure routes
    configure_routes(app)
    
    
    def filter_valid_events(events):
        today = date.today().isoformat()
        return [event for event in events if not event.get("expire") or event["expire"] > today]

    # Register it in Jinja2
    app.jinja_env.globals['validEvents'] = filter_valid_events
    
    return app
