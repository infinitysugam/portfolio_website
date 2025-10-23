#!/bin/bash

# ============================================================================
# CHATBOT ACTIVATION SCRIPT
# ============================================================================
# This script helps you activate the AI chatbot on your portfolio website
# Run: bash ACTIVATE_CHATBOT.sh
# ============================================================================

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         🤖 AI CHATBOT ACTIVATION WIZARD                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the right directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: manage.py not found!"
    echo "   Please run this script from the project root directory."
    exit 1
fi

echo "✅ Found Django project"
echo ""

# Check if chatbot app exists
if [ ! -d "chatbot" ]; then
    echo "❌ Error: chatbot/ directory not found!"
    echo "   The chatbot integration may not be complete."
    exit 1
fi

echo "✅ Chatbot app found"
echo ""

# Check if context files exist
if [ ! -f "chatbot_context/profile.txt" ]; then
    echo "❌ Error: chatbot_context/profile.txt not found!"
    exit 1
fi

echo "✅ Context files found"
echo ""

# Check if static files exist
if [ ! -f "static/css/chatbot.css" ]; then
    echo "❌ Error: static/css/chatbot.css not found!"
    exit 1
fi

if [ ! -f "static/js/chatbot.js" ]; then
    echo "❌ Error: static/js/chatbot.js not found!"
    exit 1
fi

echo "✅ Static files found"
echo ""

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  OPENAI_API_KEY environment variable is not set!"
    echo ""
    echo "   You need an OpenAI API key for the chatbot to work."
    echo ""
    echo "   Steps to get your API key:"
    echo "   1. Go to: https://platform.openai.com/api-keys"
    echo "   2. Sign in or create an account"
    echo "   3. Click 'Create new secret key'"
    echo "   4. Copy the key (starts with 'sk-')"
    echo ""
    read -p "   Do you have your API key ready? (y/n): " has_key
    
    if [ "$has_key" = "y" ] || [ "$has_key" = "Y" ]; then
        echo ""
        read -p "   Enter your OpenAI API key: " api_key
        export OPENAI_API_KEY="$api_key"
        
        # Offer to save to .env file
        read -p "   Save to .env file for future use? (y/n): " save_env
        if [ "$save_env" = "y" ] || [ "$save_env" = "Y" ]; then
            echo "OPENAI_API_KEY=$api_key" > .env
            echo "   ✅ Saved to .env file"
        else
            echo "   ⚠️  Remember to set OPENAI_API_KEY before each session:"
            echo "      export OPENAI_API_KEY='your-key-here'"
        fi
    else
        echo ""
        echo "   Please get your API key first, then run this script again."
        echo "   Or manually set it: export OPENAI_API_KEY='your-key-here'"
        exit 1
    fi
else
    echo "✅ OPENAI_API_KEY is set"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                  ✅ ALL CHECKS PASSED!                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 Your chatbot is ready to launch!"
echo ""
echo "Starting Django development server..."
echo ""
echo "Once the server starts:"
echo "  1. Open your browser to: http://localhost:8000"
echo "  2. Look for the purple chat button in the bottom-right corner"
echo "  3. Click it and try asking: 'Tell me about Sugam's experience'"
echo ""
echo "Press Ctrl+C to stop the server when done."
echo ""
echo "Starting in 3 seconds..."
sleep 3

# Start the Django server
python3 manage.py runserver
