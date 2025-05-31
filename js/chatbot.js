document.addEventListener('DOMContentLoaded', function() {
  // Create chatbot elements
  const chatbotToggle = document.createElement('div');
  chatbotToggle.className = 'chatbot-toggle';
  chatbotToggle.innerHTML = '<i class="fas fa-satellite"></i>';
  document.body.appendChild(chatbotToggle);

  const chatbotContainer = document.createElement('div');
  chatbotContainer.className = 'chatbot-container';
  chatbotContainer.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-title">
        <i class="fas fa-robot"></i>
        <span>DroneNav Assistant</span>
      </div>
      <button class="chatbot-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="chatbot-messages">
      <div class="message bot-message">
        Hi there! I'm DroneNav Assistant. I can answer questions about our drone project, team members, technologies used, and more. How can I help you today?
      </div>
    </div>
    <div class="chatbot-input">
      <input type="text" placeholder="Type your message here..." aria-label="Type your message">
      <button type="button" aria-label="Send message">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  `;
  document.body.appendChild(chatbotContainer);

  // Get DOM elements
  const chatbotMessages = document.querySelector('.chatbot-messages');
  const chatbotInput = document.querySelector('.chatbot-input input');
  const chatbotSendButton = document.querySelector('.chatbot-input button');
  const chatbotCloseButton = document.querySelector('.chatbot-close');

  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('open');
    chatbotToggle.classList.toggle('open');
    if (chatbotContainer.classList.contains('open')) {
      chatbotInput.focus();
    }
  });

  // Close chatbot
  chatbotCloseButton.addEventListener('click', function() {
    chatbotContainer.classList.remove('open');
    chatbotToggle.classList.remove('open');
  });

  // Function to add a message to the chat
  function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Function to show typing indicator
  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    typingIndicator.id = 'typing-indicator';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Function to remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Local knowledge base for fallback responses
  const localKnowledge = {
    'team': 'Our team consists of four talented members: Moin (Team Lead), Asad (Computer Vision Engineer), Asim (Hardware Engineer), and Usama (Power System Engineer). Each brings unique expertise to our drone project.',
    'project': 'DroneNav is an autonomous drone navigation system with obstacle avoidance capabilities. It uses computer vision and machine learning to navigate complex environments safely.',
    'technologies': 'We use several cutting-edge technologies including Computer Vision, Machine Learning, Object Detection, Path Planning, and Autonomous Navigation algorithms.',
    'features': 'Key features include real-time obstacle detection and avoidance, autonomous navigation in complex environments, machine learning-based decision making, and efficient path planning.',
    'supervisor': 'Our project is supervised by Lec. Abdul Basit Taj, who has been instrumental in guiding our innovative approach to autonomous navigation.',
    'hello': 'Hello! I\'m DroneNav Assistant. How can I help you learn about our drone project today?',
    'hi': 'Hi there! I\'m DroneNav Assistant. Feel free to ask me about our team, technologies, or features of our drone project!',
    'default': 'I\'m DroneNav Assistant, here to provide information about our autonomous drone navigation project. You can ask me about our team members, the technologies we use, or the key features of our system.'
  };

  // Function to get a response from local knowledge base
  function getLocalResponse(message) {
    message = message.toLowerCase();
    
    // Check for keywords in the message
    if (message.includes('team') || message.includes('members') || message.includes('who')) {
      return localKnowledge.team;
    } else if (message.includes('project') || message.includes('what') || message.includes('about')) {
      return localKnowledge.project;
    } else if (message.includes('tech') || message.includes('technology') || message.includes('technologies')) {
      return localKnowledge.technologies;
    } else if (message.includes('features') || message.includes('capabilities') || message.includes('can')) {
      return localKnowledge.features;
    } else if (message.includes('supervisor') || message.includes('professor') || message.includes('teacher')) {
      return localKnowledge.supervisor;
    } else if (message.includes('hello') || message === 'hello') {
      return localKnowledge.hello;
    } else if (message.includes('hi') || message === 'hi') {
      return localKnowledge.hi;
    } else {
      return localKnowledge.default;
    }
  }

  // Function to send message to the server with local fallback
  async function sendMessage(message) {
    try {
      showTypingIndicator();
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
        
        const data = await response.json();
        
        removeTypingIndicator();
        
        if (data.success) {
          addMessage(data.message);
          return;
        }
        // If we get here, the API call didn't succeed, fall through to local response
      } catch (error) {
        console.error('API error, using local fallback:', error);
        // Fall through to local response
      }
      
      // Use local knowledge base as fallback
      removeTypingIndicator();
      const localResponse = getLocalResponse(message);
      addMessage(localResponse);
    } catch (error) {
      removeTypingIndicator();
      addMessage('I\'m here to help with information about our drone project. What would you like to know?');
      console.error('Error in message handling:', error);
    }
  }

  // Send message on button click
  chatbotSendButton.addEventListener('click', function() {
    const message = chatbotInput.value.trim();
    if (message) {
      addMessage(message, true);
      chatbotInput.value = '';
      sendMessage(message);
    }
  });

  // Send message on Enter key press
  chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const message = chatbotInput.value.trim();
      if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        sendMessage(message);
      }
    }
  });

  // Focus input when chatbot is opened
  chatbotToggle.addEventListener('click', function() {
    setTimeout(() => {
      if (chatbotContainer.classList.contains('open')) {
        chatbotInput.focus();
      }
    }, 300);
  });
});
