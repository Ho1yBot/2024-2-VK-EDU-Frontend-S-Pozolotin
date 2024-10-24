import React, { useState, useEffect } from "react";
import "./ChatList.css"
import { loadMessages, saveMessage } from "./../Storage/Storage";
import { MessageForm, Messages } from "./../Message/Message";

const ChatList = () => {
  const [currentChatId, setCurrentChatId] = useState(null); // Current chat state
  const [attachedFile, setAttachedFile] = useState(null); // Attached file state
  const [messages, setMessages] = useState([]); // Messages of current chat
  const [chats, setChats] = useState([ // Mock chat data
    {
      id: 1,
      avatar: "./images/user-icon.svg",
      title: "Chat with Andrew",
      lastMessage: "Last message...",
      time: "14:23",
      isRead: true,
    },
    // Add more chat objects here as needed
  ]);

  // Load messages when a new chat is opened
  useEffect(() => {
    if (currentChatId) {
      const loadedMessages = loadMessages(currentChatId);
      setMessages(loadedMessages);
    }
  }, [currentChatId]);

  // Open a chat and set the chat title in the header
  const openChat = (chatId, chatTitle) => {
    setCurrentChatId(chatId);
    document.querySelector(".header_title-text").textContent = chatTitle;
  };

  // Close the current chat and clear the messages
  const closeChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  // Handle file selection and validate file size
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5000000) {
      alert("Файл слишком большой. Должен быть меньше 5 МБ.");
      setAttachedFile(null);
    } else {
      setAttachedFile(file);
    }
  };

  // Handle message form submission, including sending the file if attached
  const handleSubmit = (e, chatId) => {
    e.preventDefault();
    const messageText = e.target["message-text"].value.trim();

    if (messageText || attachedFile) {
      const newMessage = {
        text: messageText || "",
        sender: "Вы",
        time: new Date().toLocaleTimeString(),
        file: attachedFile ? URL.createObjectURL(attachedFile) : null,
      };

      saveMessage(chatId, newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setAttachedFile(null);
      e.target["message-text"].value = ""; // Clear input field
    }
  };

  return (
    <div className="chat-container">
      {/* Chat List */}
      <div
        id="chat-list-component"
        className="chat-list-component"
        style={{ display: currentChatId ? "none" : "flex" }}
      >
        {chats.map((chat) => {
          const lastMessage =
            messages.length > 0
              ? messages[messages.length - 1]
              : { text: "No messages", time: "" };

          return (
            <button
              key={chat.id}
              className="chat-item"
              onClick={() => openChat(chat.id, chat.title)}
            >
              <div className="chat-info-wrp">
                <img src={chat.avatar} alt="Avatar" />
                <div className="chat-info">
                  <h3>{chat.title}</h3>
                  <p>{lastMessage.text}</p>
                </div>
              </div>
              <div className="chat-time">
                <span>{lastMessage.time || ""}</span>
                {chat.isRead && <span className="read-status">✓✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Window */}
      {currentChatId && (
        <div className="chat-window">
          <div className="chat-header">
            <button className="back-button" onClick={closeChat}>
              <img
                src="./images/arrow-back.svg"
                alt="Back to chat list"
              />
            </button>
          </div>

          {/* Messages */}
          <Messages messages={messages} />

          {/* Message Form */}
          <MessageForm
            chatId={currentChatId}
            onMessageSend={(newMessage) => {
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatList;
