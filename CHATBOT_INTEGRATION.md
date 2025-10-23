# AI Chatbot Integration

## Overview
An intelligent, collapsible chatbot has been integrated into the website that appears on all pages. The chatbot acts as Sugam's personal AI assistant, helping recruiters and visitors learn about his experience, skills, and background.

## Features

### 1. **AI-Powered Conversations**
- Uses OpenAI's GPT-4o-mini model for intelligent responses
- Context-aware conversations about Sugam's profile
- Maintains conversation history for coherent multi-turn dialogues

### 2. **Voice Capabilities**
- **Voice Input**: Click the microphone button to speak your question (uses Web Speech API)
- **Voice Output**: Click the speaker icon on any assistant message to hear it read aloud
- Supports natural language voice interactions

### 3. **Modern UI/UX**
- Collapsible floating widget in bottom-right corner
- Smooth animations and transitions
- Dark theme matching the website's IDE aesthetic
- Mobile-responsive design
- Quick suggestion buttons for common questions

### 4. **Context Management**
- Profile information stored in `/chatbot_context/profile.txt`
- System prompt in `/chatbot_context/system_prompt.txt`
- Easy to update context without code changes

## Architecture

### Backend (Django)
- **App**: `chatbot/`
- **Endpoints**:
  - `/chatbot/chat/` - Main chat endpoint
  - `/chatbot/tts/` - Text-to-speech endpoint (optional)
- **Views**: `chatbot/views.py`
- **Context Loading**: Reads from `chatbot_context/` folder

### Frontend
- **CSS**: `static/css/chatbot.css`
- **JavaScript**: `static/js/chatbot.js`
- **Integration**: Added to `templates/base.html`

### Context Files
- `chatbot_context/profile.txt` - Complete profile information
- `chatbot_context/system_prompt.txt` - AI behavior instructions

## Setup Instructions

### 1. Install Dependencies
The required packages are already in `requirements.txt`:
- `openai==2.2.0`
- `python-dotenv==1.0.0`

### 2. Configure OpenAI API Key
Set your OpenAI API key as an environment variable:

```bash
export OPENAI_API_KEY='your-api-key-here'
```

Or add it to a `.env` file in the project root:
```
OPENAI_API_KEY=your-api-key-here
```

### 3. Update Context (Optional)
Edit the context files to update information:
- `chatbot_context/profile.txt` - Update resume/profile details
- `chatbot_context/system_prompt.txt` - Modify AI behavior

### 4. Run Migrations (if needed)
```bash
python3 manage.py migrate
```

### 5. Collect Static Files (for production)
```bash
python3 manage.py collectstatic
```

## Usage

### For Visitors
1. Click the purple chat button in the bottom-right corner
2. Type a question or click a suggestion
3. Use the microphone button for voice input
4. Click the speaker icon on responses to hear them read aloud

### Common Questions
The chatbot can answer questions about:
- Work experience and achievements
- Technical skills and expertise
- Educational background
- Projects and research
- Availability and contact information

### Example Questions
- "Tell me about Sugam's experience with Apache Spark"
- "What is his educational background?"
- "What projects has he worked on?"
- "What are his key achievements?"
- "Is he available for opportunities?"

## Customization

### Styling
Edit `static/css/chatbot.css` to customize:
- Colors and gradients
- Button sizes and positions
- Animation speeds
- Mobile breakpoints

### Behavior
Edit `chatbot_context/system_prompt.txt` to change:
- Tone and personality
- Response format
- Emphasis areas
- Conversation guidelines

### Profile Information
Edit `chatbot_context/profile.txt` to update:
- Work experience
- Skills
- Education
- Projects
- Achievements

## Technical Details

### API Integration
- **Model**: GPT-4o-mini (cost-effective, fast)
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Max Tokens**: 500 (concise responses)
- **Context Window**: Last 10 messages maintained

### Voice Features
- **Speech Recognition**: Web Speech API (Chrome, Edge)
- **Text-to-Speech**: Web Speech Synthesis API (all modern browsers)
- **Fallback**: Graceful degradation if not supported

### Security
- CSRF protection on POST endpoints
- API key stored in environment variables
- Input sanitization and HTML escaping
- Error handling for API failures

## Browser Compatibility
- **Full Support**: Chrome, Edge, Safari (latest)
- **Voice Input**: Chrome, Edge (Web Speech API)
- **Voice Output**: All modern browsers
- **Mobile**: Responsive design for all screen sizes

## Performance
- Lightweight JavaScript (~5KB)
- CSS animations use GPU acceleration
- Lazy loading of conversation history
- Efficient DOM updates

## Troubleshooting

### Chatbot not appearing
- Check that `chatbot.css` and `chatbot.js` are loaded
- Verify static files are collected
- Check browser console for errors

### API errors
- Verify OpenAI API key is set correctly
- Check API key has sufficient credits
- Ensure internet connectivity

### Voice not working
- Check browser compatibility (Chrome/Edge for input)
- Verify microphone permissions
- Test in HTTPS environment (required for microphone)

## Future Enhancements
- [ ] Add conversation export feature
- [ ] Implement typing indicators with streaming responses
- [ ] Add multi-language support
- [ ] Create admin panel for context management
- [ ] Add analytics for common questions
- [ ] Implement rate limiting
- [ ] Add conversation persistence

## Cost Considerations
- GPT-4o-mini is very cost-effective (~$0.15 per 1M input tokens)
- Average conversation: ~1000 tokens = $0.0002
- Estimated cost: $1-5/month for typical traffic
- Monitor usage in OpenAI dashboard

## Support
For issues or questions about the chatbot integration, check:
1. Browser console for JavaScript errors
2. Django logs for backend errors
3. OpenAI API status page
4. This documentation

---

**Note**: Make sure to set the `OPENAI_API_KEY` environment variable before using the chatbot feature.
