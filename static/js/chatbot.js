// Chatbot functionality
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    this.isRecording = false;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recognition = null;
    this.isVoiceMode = false;
    this.isSpeaking = false;
    
    this.init();
  }
  
  init() {
    this.createChatbotUI();
    this.attachEventListeners();
    this.initSpeechRecognition();
  }
  
  createChatbotUI() {
    const chatbotHTML = `
      <div class="chatbot-container">
        <div class="chatbot-popup" id="chatbot-popup">
          <div class="chatbot-popup-content">
            <span class="chatbot-popup-emoji">👋</span>
            <span class="chatbot-popup-text">Talk to AI Agent</span>
          </div>
          <div class="chatbot-popup-arrow"></div>
        </div>
        <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Toggle chatbot">
          <div class="chatbot-pulse"></div>
          <div class="chatbot-robot-icon">🤖</div>
        </button>
        
        <div class="chatbot-window" id="chatbot-window">
          <div class="chatbot-header">
            <div class="chatbot-avatar">🤖</div>
            <div class="chatbot-header-info">
              <h3 class="chatbot-header-title">Sugam's AI Assistant</h3>
              <p class="chatbot-header-subtitle" id="chatbot-mode-subtitle">Chat Mode</p>
            </div>
          </div>
          
          <div class="chatbot-mode-selector">
            <button class="mode-option active" id="mode-chat" data-mode="chat">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Chat Mode</span>
            </button>
            <button class="mode-option" id="mode-voice" data-mode="voice">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
              <span>Voice Mode</span>
            </button>
          </div>
          
          <div class="chatbot-messages" id="chatbot-messages">
            <div class="chatbot-welcome">
              <div class="chatbot-welcome-icon">👋</div>
              <h4 class="chatbot-welcome-title">Hi! I'm Sugam's AI Assistant</h4>
              <p class="chatbot-welcome-text">
                I can help you learn about Sugam's experience, skills, projects, and background. 
                Feel free to ask me anything!
              </p>
              <div class="chatbot-suggestions">
                <button class="chatbot-suggestion" data-suggestion="Tell me about Sugam's experience">
                  💼 Tell me about Sugam's experience
                </button>
                <button class="chatbot-suggestion" data-suggestion="What are Sugam's technical skills?">
                  🛠️ What are Sugam's technical skills?
                </button>
                <button class="chatbot-suggestion" data-suggestion="What is Sugam's educational background?">
                  🎓 What is Sugam's educational background?
                </button>
                <button class="chatbot-suggestion" data-suggestion="What projects has Sugam worked on?">
                  🚀 What projects has Sugam worked on?
                </button>
              </div>
            </div>
          </div>
          
          <div class="chatbot-input-container" id="chatbot-input-container">
            <button class="chatbot-voice-btn" id="chatbot-voice-btn" aria-label="Voice input" title="Click to speak">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            <div class="chatbot-input-wrapper">
              <textarea 
                class="chatbot-input" 
                id="chatbot-input" 
                placeholder="Ask me anything about Sugam..."
                rows="1"
              ></textarea>
            </div>
            <button class="chatbot-send-btn" id="chatbot-send-btn" aria-label="Send message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
            <button class="chatbot-ptt-btn" id="chatbot-ptt-btn" aria-label="Push to talk" title="Hold to speak">
              <div class="ptt-ripple"></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
              <span class="ptt-text">Hold to Speak</span>
            </button>
          </div>
          <button class="chatbot-stop-speaking" id="chatbot-stop-speaking" aria-label="Stop voice response">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="6" width="12" height="12"></rect>
            </svg>
            <span>Stop Voice</span>
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }
  
  attachEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');
    const voiceBtn = document.getElementById('chatbot-voice-btn');
    const modeChatBtn = document.getElementById('mode-chat');
    const modeVoiceBtn = document.getElementById('mode-voice');
    const pttBtn = document.getElementById('chatbot-ptt-btn');
    const stopSpeakingBtn = document.getElementById('chatbot-stop-speaking');
    
    toggle.addEventListener('click', () => this.toggleChatbot());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    });
    
    // Voice button
    voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
    
    // Mode selector buttons
    modeChatBtn.addEventListener('click', () => this.setMode('chat'));
    modeVoiceBtn.addEventListener('click', () => this.setMode('voice'));
    
    // Stop speaking button
    stopSpeakingBtn.addEventListener('click', () => this.stopSpeaking());
    
    // Push-to-talk button (mouse events)
    pttBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.startPushToTalk();
    });
    pttBtn.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.stopPushToTalk();
    });
    pttBtn.addEventListener('mouseleave', (e) => {
      if (this.isRecording) {
        this.stopPushToTalk();
      }
    });
    
    // Push-to-talk button (touch events for mobile)
    pttBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startPushToTalk();
    });
    pttBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.stopPushToTalk();
    });
    pttBtn.addEventListener('touchcancel', (e) => {
      if (this.isRecording) {
        this.stopPushToTalk();
      }
    });
    
    // Suggestion buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('chatbot-suggestion')) {
        const suggestion = e.target.dataset.suggestion;
        this.sendMessage(suggestion);
      }
    });
    
    // Message action buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.chatbot-message-action')) {
        const action = e.target.closest('.chatbot-message-action');
        if (action.dataset.action === 'speak') {
          const messageContent = action.closest('.chatbot-message').querySelector('.chatbot-message-content').textContent;
          this.speakText(messageContent);
        }
      }
    });
  }
  
  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('chatbot-input');
        input.value = transcript;
        
        // Auto-send in voice mode, otherwise just populate input
        if (this.isVoiceMode) {
          this.sendMessage();
        }
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.stopRecording();
        const pttBtn = document.getElementById('chatbot-ptt-btn');
        if (pttBtn) {
          pttBtn.classList.remove('active');
        }
      };
      
      this.recognition.onend = () => {
        this.stopRecording();
        const pttBtn = document.getElementById('chatbot-ptt-btn');
        if (pttBtn) {
          pttBtn.classList.remove('active');
        }
      };
    }
  }
  
  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    const toggle = document.getElementById('chatbot-toggle');
    const popup = document.getElementById('chatbot-popup');
    
    if (this.isOpen) {
      window.classList.add('active');
      toggle.classList.add('active');
      popup.classList.add('hidden');
    } else {
      window.classList.remove('active');
      toggle.classList.remove('active');
    }
  }
  
  setMode(mode) {
    this.isVoiceMode = mode === 'voice';
    const modeChatBtn = document.getElementById('mode-chat');
    const modeVoiceBtn = document.getElementById('mode-voice');
    const subtitle = document.getElementById('chatbot-mode-subtitle');
    const inputContainer = document.getElementById('chatbot-input-container');
    
    if (this.isVoiceMode) {
      modeChatBtn.classList.remove('active');
      modeVoiceBtn.classList.add('active');
      subtitle.textContent = 'Voice Mode - Hold to speak';
      inputContainer.classList.add('voice-mode');
    } else {
      modeChatBtn.classList.add('active');
      modeVoiceBtn.classList.remove('active');
      subtitle.textContent = 'Chat Mode';
      inputContainer.classList.remove('voice-mode');
    }
  }
  
  startPushToTalk() {
    if (!this.recognition) {
      this.showError('Voice input is not supported in your browser');
      return;
    }
    
    try {
      this.recognition.start();
      this.isRecording = true;
      const pttBtn = document.getElementById('chatbot-ptt-btn');
      pttBtn.classList.add('active');
    } catch (error) {
      console.error('Error starting push-to-talk:', error);
    }
  }
  
  stopPushToTalk() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      const pttBtn = document.getElementById('chatbot-ptt-btn');
      pttBtn.classList.remove('active');
    }
  }
  
  toggleVoiceInput() {
    if (!this.recognition) {
      this.showError('Voice input is not supported in your browser');
      return;
    }
    
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }
  
  startRecording() {
    try {
      this.recognition.start();
      this.isRecording = true;
      const voiceBtn = document.getElementById('chatbot-voice-btn');
      voiceBtn.classList.add('recording');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }
  
  stopRecording() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      const voiceBtn = document.getElementById('chatbot-voice-btn');
      voiceBtn.classList.remove('recording');
    }
  }
  
  async sendMessage(messageText = null) {
    const input = document.getElementById('chatbot-input');
    const message = messageText || input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // Remove welcome message if present
    const welcome = document.querySelector('.chatbot-welcome');
    if (welcome) {
      welcome.remove();
    }
    
    // Add user message
    this.addMessage(message, 'user');
    
    // Show typing indicator
    this.showTyping();
    
    try {
      // Send to backend
      const response = await fetch('/chatbot/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          history: this.conversationHistory
        })
      });
      
      const data = await response.json();
      
      // Remove typing indicator
      this.hideTyping();
      
      if (data.success) {
        // Add assistant message
        this.addMessage(data.response, 'assistant');
        
        // Update conversation history
        this.conversationHistory.push(
          { role: 'user', content: message },
          { role: 'assistant', content: data.response }
        );
        
        // Auto-speak in voice mode
        if (this.isVoiceMode) {
          // Extract text from markdown for speaking
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = marked.parse(data.response);
          const textToSpeak = tempDiv.textContent || tempDiv.innerText;
          this.speakText(textToSpeak);
        }
      } else {
        this.showError(data.error || 'An error occurred');
      }
    } catch (error) {
      this.hideTyping();
      this.showError('Failed to connect to the chatbot. Please try again.');
      console.error('Chatbot error:', error);
    }
  }
  
  addMessage(content, role) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    // Render markdown for assistant messages, escape HTML for user messages
    const renderedContent = role === 'assistant' 
      ? marked.parse(content)
      : this.escapeHtml(content);
    
    const messageHTML = `
      <div class="chatbot-message ${role}">
        <div class="chatbot-message-avatar">
          ${role === 'assistant' ? '🤖' : '👤'}
        </div>
        <div>
          <div class="chatbot-message-content">${renderedContent}</div>
          ${role === 'assistant' ? `
            <div class="chatbot-message-actions">
              <button class="chatbot-message-action" data-action="speak" title="Read aloud">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();
  }
  
  showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingHTML = `
      <div class="chatbot-message assistant" id="typing-indicator">
        <div class="chatbot-message-avatar">🤖</div>
        <div class="chatbot-message-content">
          <div class="chatbot-typing">
            <div class="chatbot-typing-dot"></div>
            <div class="chatbot-typing-dot"></div>
            <div class="chatbot-typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    this.scrollToBottom();
  }
  
  hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) {
      typing.remove();
    }
  }
  
  showError(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const errorHTML = `
      <div class="chatbot-error">
        ⚠️ ${this.escapeHtml(message)}
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', errorHTML);
    this.scrollToBottom();
  }
  
  async speakText(text) {
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Show stop button
      this.isSpeaking = true;
      const stopBtn = document.getElementById('chatbot-stop-speaking');
      if (stopBtn) {
        stopBtn.classList.add('visible');
      }
      
      // Hide stop button when speech ends
      utterance.onend = () => {
        this.isSpeaking = false;
        if (stopBtn) {
          stopBtn.classList.remove('visible');
        }
      };
      
      utterance.onerror = () => {
        this.isSpeaking = false;
        if (stopBtn) {
          stopBtn.classList.remove('visible');
        }
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      this.showError('Text-to-speech is not supported in your browser');
    }
  }
  
  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      const stopBtn = document.getElementById('chatbot-stop-speaking');
      if (stopBtn) {
        stopBtn.classList.remove('visible');
      }
    }
  }
  
  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
  });
} else {
  new Chatbot();
}
