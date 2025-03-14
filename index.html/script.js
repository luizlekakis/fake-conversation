// script.js

// Função para salvar as mensagens no localStorage
function saveMessages(messages) {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Função para carregar as mensagens do localStorage
function loadMessages() {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
}

// Função para renderizar as mensagens
function renderMessages() {
    const messages = loadMessages();
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = ''; // Limpa o conteúdo atual

    messages.forEach((message, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.type);

        const messageText = document.createElement('span');
        messageText.classList.add('message-text');
        messageText.textContent = message.text;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => deleteMessage(index));

        messageElement.appendChild(messageText);
        messageElement.appendChild(deleteButton);
        messageContainer.appendChild(messageElement);
    });

    // Rola a tela para a última mensagem
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Função para adicionar nova mensagem
function addMessage(text, type) {
    const messages = loadMessages();
    const newMessage = {
        text,
        type,
        read: false, // Novo estado de "visto"
    };
    messages.push(newMessage);
    saveMessages(messages);
    renderMessages();
}

// Função para remover a última mensagem
function deleteMessage(index) {
    const messages = loadMessages();
    messages.splice(index, 1); // Remove a mensagem do array
    saveMessages(messages);
    renderMessages();
}

// Função para alternar entre mensagens enviadas e recebidas
function toggleMessageType() {
    const messageInput = document.getElementById('message-input');
    const text = messageInput.value.trim();
    const messageSide = document.getElementById('message-side').value; // Obtém o valor do seletor (enviado ou recebido)
    
    if (text) {
        addMessage(text, messageSide); // Usa o valor do seletor para decidir se a mensagem vai para o lado esquerdo ou direito
        messageInput.value = ''; // Limpa o campo após enviar
    }
}

// Função para remover a última mensagem
function clearLastMessage() {
    const messages = loadMessages();
    if (messages.length > 0) {
        messages.pop();
        saveMessages(messages);
        renderMessages();
    }
}

// Adicionando os listeners
document.getElementById('send-btn').addEventListener('click', toggleMessageType);
document.getElementById('clear-btn').addEventListener('click', clearLastMessage);

// Adicionando listener para pressionamento da tecla Enter
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        toggleMessageType();
    }
});

// Inicializa o chat com as mensagens do localStorage
renderMessages();
