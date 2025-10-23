# AI Chatbot Features Documentation

## Overview
This document describes the comprehensive AI chatbot implementation for Sugam's portfolio website, featuring both popup and full-page modes with advanced voice interaction capabilities.

## Features

### 1. **Dual Mode Interface**
- **Chat Mode**: Traditional text-based interaction with optional voice input
- **Voice Mode**: Push-to-talk interface with automatic voice responses

### 2. **Popup Chatbot** (Available on all pages)
- Floating button in bottom-right corner
- Animated popup with "Talk to AI Agent" message
- Expandable chat window (500px × 700px, responsive)
- Minimizable interface that doesn't interfere with page content

### 3. **Full-Page Demo** (`/chatbot-demo/`)
- Dedicated page showcasing the chatbot in full-screen mode
- Same functionality as popup, but optimized for larger display
- Accessible via navigation menu: `chatbot_demo.ai`
- Perfect for demonstrations and extended conversations

### 4. **Chat Mode Features**
- Text input with auto-resize textarea
- Send button and Enter key support
- Voice input button (click to speak)
- Markdown rendering for rich responses
- Code syntax highlighting
- Conversation history maintained
- Suggested questions for quick start

### 5. **Voice Mode Features**
- **Push-to-Talk Interface**: Hold button to speak, release to send
- **Automatic Voice Responses**: AI speaks answers automatically
- **Visual Feedback**: 
  - Pulsing microphone icon while recording
  - Ripple animation effect
  - Gradient background when active
- **Stop Voice Button**: Red button to interrupt AI speech
- **Mobile-Friendly**: Touch events supported

### 6. **Mode Selector**
- Clear, prominent toggle between Chat and Voice modes
- Visual indication of active mode
- Icon + text labels for clarity
- Mobile-responsive (icon-only on small screens)

### 7. **Voice Controls**
- **Speech Recognition**: Browser-based voice input (Web Speech API)
- **Text-to-Speech**: Natural voice output for responses
- **Stop Speaking**: Interrupt AI at any time with visible button
- **Voice Button**: Hidden in Voice Mode (always active)

### 8. **UI/UX Enhancements**
- **Animated Popup**: Bouncing, floating animation with waving hand emoji
- **Dark Theme**: IDE-inspired color scheme
- **Smooth Animations**: Transitions for all interactions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: ARIA labels and keyboard support

### 9. **Technical Features**
- **Conversation Context**: Maintains chat history for coherent conversations
- **Markdown Support**: Rich text formatting in responses
- **Error Handling**: Graceful error messages
- **Loading States**: Typing indicator while AI thinks
- **Auto-scroll**: Messages automatically scroll into view

## File Structure

```
personal_website/
├── templates/
│   ├── base.html                 # Main template with popup chatbot
│   └── chatbot_demo.html         # Full-page chatbot demo
├── static/
│   ├── css/
│   │   └── chatbot.css          # All chatbot styles
│   └── js/
│       └── chatbot.js           # Chatbot functionality
├── chatbot/
│   ├── views.py                 # Backend API endpoints
│   └── urls.py                  # Chatbot routes
├── chatbot_context/
│   ├── system_prompt.txt        # AI personality and instructions
│   ├── profile.txt              # Sugam's information
│   └── example_conversations.txt # Training examples
└── personal_website/
    ├── views.py                 # Demo page view
    └── urls.py                  # URL routing

```

## Usage

### Popup Chatbot (All Pages)
1. Click the robot icon in bottom-right corner
2. Choose Chat or Voice mode
3. Start chatting or speaking
4. Click robot icon again to minimize

### Full-Page Demo
1. Navigate to `/chatbot-demo/` or click `chatbot_demo.ai` in navigation
2. Full chatbot interface displayed
3. All features available in larger format
4. Click "Back to Home" to return

### Chat Mode
1. Type message in text box
2. Press Enter or click Send button
3. Optional: Click microphone to use voice input
4. Click speaker icon on messages to hear them

### Voice Mode
1. Click "Voice Mode" button
2. Hold down the large button
3. Speak your question
4. Release button to send
5. AI responds with voice automatically
6. Click "Stop Voice" to interrupt

## Browser Compatibility

### Required Features
- **Speech Recognition**: Chrome, Edge, Safari (iOS 14.5+)
- **Speech Synthesis**: All modern browsers
- **Markdown Rendering**: marked.js library (included)

### Fallbacks
- Voice features gracefully degrade if not supported
- Error messages guide users to compatible browsers
- Text input always available as fallback

## API Endpoints

### `/chatbot/chat/` (POST)
- **Purpose**: Send message and get AI response
- **Request**: `{ message: string, history: array }`
- **Response**: `{ success: boolean, response: string }`

## Customization

### Styling
- Edit `static/css/chatbot.css`
- CSS variables for easy theme customization
- Responsive breakpoints at 768px and 480px

### AI Behavior
- Edit `chatbot_context/system_prompt.txt` for personality
- Update `chatbot_context/profile.txt` with new information
- Add examples to `chatbot_context/example_conversations.txt`

### Voice Settings
- Adjust speech rate, pitch, volume in `chatbot.js`
- Modify `utterance.rate`, `utterance.pitch`, `utterance.volume`

## Performance

- **Lazy Loading**: Chatbot UI created on page load
- **Efficient Rendering**: Only active messages rendered
- **Optimized Animations**: GPU-accelerated transforms
- **Minimal Bundle**: ~50KB total (CSS + JS)

## Security

- **CSRF Protection**: Django CSRF tokens on all POST requests
- **Input Sanitization**: HTML escaped in messages
- **Rate Limiting**: Backend API rate limits (recommended)
- **Content Security**: Markdown sanitized before rendering

## Future Enhancements

Potential features to add:
- [ ] Voice language selection
- [ ] Chat history persistence
- [ ] Export conversation
- [ ] Multi-language support
- [ ] Custom voice selection
- [ ] Typing indicators for user
- [ ] Message reactions
- [ ] File attachments
- [ ] Screen reader optimization

## Troubleshooting

### Voice Input Not Working
- Check browser compatibility (Chrome/Edge recommended)
- Ensure microphone permissions granted
- Try HTTPS (required for some browsers)

### Voice Output Not Working
- Check browser audio settings
- Ensure volume is not muted
- Try different browser if issues persist

### Chatbot Not Appearing
- Check JavaScript console for errors
- Verify static files are loading
- Clear browser cache and reload

## Credits

- **Design**: Custom IDE-inspired theme
- **Icons**: Inline SVG icons
- **Markdown**: marked.js library
- **Speech APIs**: Web Speech API (browser native)

## Support

For issues or questions:
- Check browser console for errors
- Verify all static files are loaded
- Test in different browsers
- Review Django server logs

---

**Version**: 1.0  
**Last Updated**: October 2025  
**Author**: Sugam Mishra
