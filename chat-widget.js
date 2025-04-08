// Chat Widget Script - Versión personalizada para zAI
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-background: #ffffff;
            --chat--color-font: #1f2937;
            --chat--color-accent: #10b981;  /* Color verde para detalles */
            --chat--button-size: ${config.style?.buttonSize};  /* Tamaño por defecto */
            --chat--color-primary: ${config.style?.primaryColor};  /* Color primario */
            --chat--color-secondary: ${config.style?.secondaryColor};  /* Color secundario */
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.05);
            overflow: hidden;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
        }

        .n8n-chat-widget .chat-title {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
        }

        .n8n-chat-widget .chat-subtitle {
            font-size: 14px;
            opacity: 0.9;
            margin: 0;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 20px;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            font-size: 24px;
            opacity: 0.8;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .welcome-screen {
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            height: 100%;
            justify-content: center;
        }

        .n8n-chat-widget .welcome-title {
            font-size: 24px;
            font-weight: 700;
            color: var(--chat--color-font);
            margin-bottom: 8px;
        }

        .n8n-chat-widget .welcome-subtitle {
            font-size: 16px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin-bottom: 30px;
        }

        .n8n-chat-widget .divider {
            width: 100%;
            height: 1px;
            background: rgba(0, 0, 0, 0.05);
            margin: 20px 0;
        }

        .n8n-chat-widget .new-conversation-btn {
            width: 100%;
            padding: 16px;
            background: var(--chat--color-primary);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
        }

        .n8n-chat-widget .new-conversation-btn:hover {
            background: var(--chat--color-secondary);
        }

        .n8n-chat-widget .support-text {
            font-size: 14px;
            color: var(--chat--color-accent);
            font-weight: 500;
            margin-top: 30px;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: #f9fafb;
            border: 1px solid rgba(0, 0, 0, 0.05);
            color: var(--chat--color-font);
            align-self: flex-start;
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-input button {
            background: var(--chat--color-primary);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: background 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-input button:hover {
            background: var(--chat--color-secondary);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
                bottom: var(--chat--button-bottom);
                right: var(--chat--button-right);
                width: var(--chat--button-size);
                height: var(--chat--button-size);
                border-radius: calc(var(--chat--button-size) / 2);
                background: linear-gradient(
                    135deg, 
                    var(--chat--color-primary) 0%, 
                    var(--chat--color-secondary) 100%
                );
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
                z-index: 999;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: var(--chat--button-right);
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(79, 70, 229, 0.4);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: calc(var(--chat--button-size) * 0.4);
            height: calc(var(--chat--button-size) * 0.4);
            fill: currentColor;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget .chat-toggle:hover svg {
            transform: scale(1.1);
        }
    `;

    // Load Inter font (similar a Geist pero más común)
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration for zAI
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            name: 'Asistente zAI',
            welcomeText: '¡Hola! Soy el asistente de zAI',
            responseTimeText: 'Soporte 24/7',
            poweredBy: {
                text: 'Powered by zAI',
                link: ''
            }
        },
        style: {
            buttonSize: '60px',
            buttonBottom: '20px',
            buttonRight: '20px',
            primaryColor: '#4f46e5',
            secondaryColor: '#6366f1',
            backgroundColor: '#ffffff',
            fontColor: '#1f2937'
        }
    };

    // Merge user config with defaults
    //const config = window.ChatWidgetConfig ? 
        {
           // webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
           // branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            //style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
       // } : defaultConfig;
    const config = (() => {
        const userConfig = window.ChatWidgetConfig || {};
        return {
            webhook: { ...defaultConfig.webhook, ...(userConfig.webhook || {}) },
            branding: { ...defaultConfig.branding, ...(userConfig.branding || {}) },
            style: { ...defaultConfig.style, ...(userConfig.style || {}) }
        };
    })();

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    
    const welcomeScreenHTML = `
        <div class="brand-header">
            <button class="close-button">×</button>
            <h3 class="chat-title">${config.branding.name}</h3>
            <p class="chat-subtitle">Inicia un chat. Estamos aquí para ayudarte.</p>
        </div>
        <div class="welcome-screen">
            <h2 class="welcome-title">¡Hola!</h2>
            <p class="welcome-subtitle">Soy el asistente de zAI.<br>¿Cómo puedo ayudarte hoy?</p>
            <div class="divider"></div>
            <button class="new-conversation-btn">Nueva Conversación</button>
            <p class="support-text">${config.branding.responseTimeText}</p>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <button class="close-button">×</button>
                <h3 class="chat-title">${config.branding.name}</h3>
                <p class="chat-subtitle">En conversación</p>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Escribe tu pregunta..." rows="1"></textarea>
                <button type="submit">Enviar</button>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = welcomeScreenHTML + chatInterfaceHTML;
    
    // Al crear el botón flotante
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>
    `;
            
            /* const toggleButton = document.createElement('button');
    toggleButton.className = 'chat-toggle';
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`; */
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const newConversationBtn = chatContainer.querySelector('.new-conversation-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    function generateUUID() {
        return crypto.randomUUID();
    }

    async function startNewConversation() {
        currentSessionId = generateUUID();
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: ""
            }
        }];

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            chatInterface.classList.add('active');

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(responseData) ? responseData[0].output : responseData.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            const data = await response.json();
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    newConversationBtn.addEventListener('click', startNewConversation);
    
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
            }
        }
    });
    
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
})();
