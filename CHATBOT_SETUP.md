# Chatbot Setup Guide

## Quick Start

### 1. Set OpenAI API Key
```bash
export OPENAI_API_KEY='your-api-key-here'
```

Or create a `.env` file:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### 2. Verify Installation
The chatbot is already integrated! Just make sure you have the OpenAI package:
```bash
pip install openai==2.2.0
```

### 3. Run the Server
```bash
python3 manage.py runserver
```

### 4. Test the Chatbot
1. Open your browser to `http://localhost:8000`
2. Look for the purple chat button in the bottom-right corner
3. Click it to open the chatbot
4. Try asking: "Tell me about Sugam's experience"

## What Was Integrated

### ✅ Backend Components
- **Django App**: `chatbot/` with views, URLs, and API endpoints
- **Context Files**: `chatbot_context/` with profile and system prompt
- **API Endpoints**:
  - `/chatbot/chat/` - Main chat endpoint
  - `/chatbot/tts/` - Text-to-speech endpoint

### ✅ Frontend Components
- **CSS**: `static/css/chatbot.css` - Beautiful dark theme styling
- **JavaScript**: `static/js/chatbot.js` - Full chatbot functionality
- **Integration**: Added to `templates/base.html` (appears on all pages)

### ✅ Features Implemented
- 🤖 AI-powered responses using GPT-4o-mini
- 🎤 Voice input (speech-to-text)
- 🔊 Voice output (text-to-speech)
- 💬 Conversation history
- 📱 Mobile responsive
- 🎨 Modern UI with animations
- 💡 Quick suggestion buttons

## File Structure
```
personal_website/
├── chatbot/                          # Django app
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py
│   ├── admin.py
│   ├── tests.py
│   ├── views.py                      # Chat API logic
│   └── urls.py                       # URL routing
├── chatbot_context/                  # AI context
│   ├── profile.txt                   # Your profile info
│   └── system_prompt.txt             # AI behavior
├── static/
│   ├── css/
│   │   └── chatbot.css              # Chatbot styles
│   └── js/
│       └── chatbot.js               # Chatbot logic
├── templates/
│   └── base.html                    # Updated with chatbot
├── .env.example                     # Environment template
└── CHATBOT_INTEGRATION.md           # Full documentation
```

## Testing Checklist

### Basic Functionality
- [ ] Chatbot button appears in bottom-right corner
- [ ] Clicking button opens/closes chatbot window
- [ ] Welcome message displays with suggestions
- [ ] Can type and send messages
- [ ] Receives AI responses
- [ ] Conversation history maintained

### Voice Features
- [ ] Microphone button visible
- [ ] Click microphone to start recording (Chrome/Edge)
- [ ] Speak and see transcription
- [ ] Speaker icon on AI messages
- [ ] Click speaker to hear response

### UI/UX
- [ ] Smooth animations
- [ ] Scrolling works properly
- [ ] Mobile responsive
- [ ] Dark theme matches website
- [ ] Typing indicator shows while waiting

### Error Handling
- [ ] Shows error if API key missing
- [ ] Handles network errors gracefully
- [ ] Voice features degrade gracefully in unsupported browsers

## Customization

### Update Your Information
Edit `chatbot_context/profile.txt` to update:
- Work experience
- Skills
- Education
- Projects
- Contact info

### Change AI Behavior
Edit `chatbot_context/system_prompt.txt` to modify:
- Tone and personality
- Response style
- What to emphasize
- How to handle questions

### Styling
Edit `static/css/chatbot.css` to change:
- Colors (search for `#667eea` and `#764ba2`)
- Button position
- Window size
- Animations

### Suggestions
Edit `static/js/chatbot.js` around line 60 to change the quick suggestion buttons.

## Troubleshooting

### Chatbot doesn't appear
```bash
# Check static files are loaded
python3 manage.py collectstatic --noinput

# Verify files exist
ls static/css/chatbot.css
ls static/js/chatbot.js
```

### API Key Error
```bash
# Verify environment variable
echo $OPENAI_API_KEY

# Or check .env file
cat .env
```

### Voice not working
- **Input**: Requires Chrome/Edge browser
- **Permissions**: Allow microphone access
- **HTTPS**: Voice input requires HTTPS in production

### Import Error
```bash
# Install/upgrade OpenAI package
pip install --upgrade openai
```

## Production Deployment

### 1. Environment Variables
Set on your server:
```bash
export OPENAI_API_KEY='your-production-key'
export DEBUG=False
```

### 2. Static Files
```bash
python3 manage.py collectstatic --noinput
```

### 3. HTTPS Required
Voice input requires HTTPS. Make sure your server has SSL configured.

### 4. Security
- Never commit `.env` file
- Keep API keys secret
- Monitor OpenAI usage
- Set rate limits if needed

## Cost Estimation

### OpenAI API Costs (GPT-4o-mini)
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens
- Average conversation: ~1000 tokens
- **Cost per conversation: ~$0.0002**

### Expected Monthly Cost
- 100 conversations/day = $0.60/month
- 500 conversations/day = $3.00/month
- 1000 conversations/day = $6.00/month

Very affordable! 💰

## Support

### Check Logs
```bash
# Django logs
python3 manage.py runserver

# Browser console
Open DevTools (F12) → Console tab
```

### Common Issues
1. **No response**: Check API key and internet
2. **Voice not working**: Try Chrome/Edge, check permissions
3. **Styling issues**: Clear browser cache, check CSS loaded
4. **Import errors**: Reinstall requirements

## Next Steps

### Enhancements You Can Add
1. **Conversation Export**: Let users download chat history
2. **Analytics**: Track common questions
3. **Multi-language**: Add language detection
4. **Streaming**: Show responses as they generate
5. **Feedback**: Add thumbs up/down buttons
6. **Context Updates**: Admin panel for easy editing

### Monitoring
- Check OpenAI dashboard for usage
- Monitor response times
- Track user engagement
- Review conversation logs

## Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Django Documentation](https://docs.djangoproject.com/)

---

**🎉 Your AI chatbot is ready!** It will appear on all pages and help recruiters learn about your background.

**Need help?** Check `CHATBOT_INTEGRATION.md` for detailed technical documentation.
