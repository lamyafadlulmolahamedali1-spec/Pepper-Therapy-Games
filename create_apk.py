import os
import zipfile
import json
from pathlib import Path

print("📦 إنشاء APK لتطبيق Pepper Therapy...")

# إنشاء المجلدات
os.makedirs("pepper_app", exist_ok=True)

# إنشاء ملف manifest
manifest = {
    "name": "Pepper Therapy",
    "short_name": "Pepper",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#667eea",
    "background_color": "#667eea",
    "icons": [{"src": "icon.png", "sizes": "192x192", "type": "image/png"}]
}

with open("pepper_app/manifest.json", "w") as f:
    json.dump(manifest, f)

print("✅ الملفات جاهزة!")
print("")
print("📱 الطريقة الأسهل:")
print("1. افتح الرابط على هاتفك:")
print("   https://liturgical-kristopher-semirhythmic.ngrok-free.dev")
print("2. اضغط Share → Add to Home Screen")
print("3. التطبيق سيصبح على شاشة هاتفك!")
