import os
import json

def load_all_translations():
    translations = {}
    translations['en'] = load_translations('en')
    translations['cs'] = load_translations('cs')
    return translations

def load_translations(lang):
    file_path = os.path.join(os.path.dirname(__file__), 'translations', f'{lang}.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)
