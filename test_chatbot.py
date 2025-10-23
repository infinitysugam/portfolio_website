#!/usr/bin/env python3
"""
Quick test script to verify chatbot setup
Run: python3 test_chatbot.py
"""

import os
import sys
from pathlib import Path

def check_file_exists(filepath, description):
    """Check if a file exists"""
    if Path(filepath).exists():
        print(f"✅ {description}: {filepath}")
        return True
    else:
        print(f"❌ {description} MISSING: {filepath}")
        return False

def check_env_var(var_name):
    """Check if environment variable is set"""
    value = os.environ.get(var_name)
    if value:
        print(f"✅ {var_name} is set")
        return True
    else:
        print(f"⚠️  {var_name} is NOT set (required for chatbot to work)")
        return False

def main():
    print("=" * 60)
    print("CHATBOT INTEGRATION VERIFICATION")
    print("=" * 60)
    print()
    
    base_dir = Path(__file__).parent
    all_good = True
    
    # Check Django app files
    print("📁 Checking Django App Files...")
    files_to_check = [
        (base_dir / "chatbot" / "__init__.py", "Chatbot app init"),
        (base_dir / "chatbot" / "apps.py", "Chatbot app config"),
        (base_dir / "chatbot" / "views.py", "Chatbot views"),
        (base_dir / "chatbot" / "urls.py", "Chatbot URLs"),
        (base_dir / "chatbot" / "models.py", "Chatbot models"),
    ]
    
    for filepath, desc in files_to_check:
        if not check_file_exists(filepath, desc):
            all_good = False
    print()
    
    # Check context files
    print("📝 Checking Context Files...")
    context_files = [
        (base_dir / "chatbot_context" / "profile.txt", "Profile context"),
        (base_dir / "chatbot_context" / "system_prompt.txt", "System prompt"),
    ]
    
    for filepath, desc in context_files:
        if not check_file_exists(filepath, desc):
            all_good = False
    print()
    
    # Check static files
    print("🎨 Checking Static Files...")
    static_files = [
        (base_dir / "static" / "css" / "chatbot.css", "Chatbot CSS"),
        (base_dir / "static" / "js" / "chatbot.js", "Chatbot JavaScript"),
    ]
    
    for filepath, desc in static_files:
        if not check_file_exists(filepath, desc):
            all_good = False
    print()
    
    # Check template integration
    print("📄 Checking Template Integration...")
    base_template = base_dir / "templates" / "base.html"
    if base_template.exists():
        content = base_template.read_text()
        if "chatbot.css" in content:
            print("✅ Chatbot CSS linked in base.html")
        else:
            print("❌ Chatbot CSS NOT linked in base.html")
            all_good = False
            
        if "chatbot.js" in content:
            print("✅ Chatbot JS linked in base.html")
        else:
            print("❌ Chatbot JS NOT linked in base.html")
            all_good = False
    else:
        print("❌ base.html template not found")
        all_good = False
    print()
    
    # Check settings.py
    print("⚙️  Checking Django Settings...")
    settings_file = base_dir / "personal_website" / "settings.py"
    if settings_file.exists():
        content = settings_file.read_text()
        if "'chatbot'" in content:
            print("✅ Chatbot app added to INSTALLED_APPS")
        else:
            print("❌ Chatbot app NOT in INSTALLED_APPS")
            all_good = False
    print()
    
    # Check main URLs
    print("🔗 Checking URL Configuration...")
    urls_file = base_dir / "personal_website" / "urls.py"
    if urls_file.exists():
        content = urls_file.read_text()
        if "chatbot" in content:
            print("✅ Chatbot URLs included in main urls.py")
        else:
            print("❌ Chatbot URLs NOT included in main urls.py")
            all_good = False
    print()
    
    # Check environment variables
    print("🔑 Checking Environment Variables...")
    if not check_env_var("OPENAI_API_KEY"):
        all_good = False
        print("   ⚠️  Set with: export OPENAI_API_KEY='your-key-here'")
    print()
    
    # Check Python packages
    print("📦 Checking Python Packages...")
    try:
        import openai
        print(f"✅ OpenAI package installed (version {openai.__version__})")
    except ImportError:
        print("❌ OpenAI package NOT installed")
        print("   Install with: pip install openai==2.2.0")
        all_good = False
    
    try:
        import django
        print(f"✅ Django installed (version {django.__version__})")
    except ImportError:
        print("❌ Django NOT installed")
        all_good = False
    print()
    
    # Final summary
    print("=" * 60)
    if all_good:
        print("✅ ALL CHECKS PASSED!")
        print()
        print("🚀 Your chatbot is ready to use!")
        print()
        print("Next steps:")
        print("1. Make sure OPENAI_API_KEY is set")
        print("2. Run: python3 manage.py runserver")
        print("3. Open http://localhost:8000")
        print("4. Look for the purple chat button in bottom-right")
    else:
        print("⚠️  SOME CHECKS FAILED")
        print()
        print("Please review the errors above and fix them.")
        print("See CHATBOT_SETUP.md for detailed instructions.")
    print("=" * 60)
    
    return 0 if all_good else 1

if __name__ == "__main__":
    sys.exit(main())
