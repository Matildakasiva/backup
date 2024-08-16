import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Messaging.css';
import Loading from './Loading';

const socket = io.connect('http://localhost:5555');

const Messaging = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false)

  const session = JSON.parse(localStorage.getItem('session'));
  const token=session && session.accessToken
  console.log('Retrieved token:', token);

  useEffect(() => {
    axios.get('http://localhost:5555/users', {
      headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    axios.get('http://localhost:5555/messages', {
       headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

    return () => {
      socket.off('new_message');
    };
  }, []);

  useEffect(() => {
    socket.on('new_message', (message) => {
      setMessages(messages => [...messages, message]);
      setCurrentChat(currentChat => [...currentChat, message]);
    });

    return () => {
      socket.off('new_message');
    };
  }, []);


  const handleUserClick = (user) => {
    setCurrentUser(user);
    const chat = messages.filter(msg =>
      (msg.sender_id === user.id && msg.recipient_id === session.user.id) ||
      (msg.sender_id === session.user.id && msg.recipient_id === user.id)
    );
    setCurrentChat(chat);
  };

  const handleSendMessage = () => {
    setSendingMessage(true);
    const messageData = {
      recipient_id: currentUser.id,
      message: newMessage,
    };

    axios.post('http://localhost:5555/messages', messageData, {
       headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
      .then(response => {
        setNewMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
    setSendingMessage(false);
  };

  const dateFormatter = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const formattedDate = date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    return formattedDate;
  };

  return (
    <div className="message-container">
      <div className="user-list">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user)}
            className={user.id === currentUser?.id ? 'active' : ''}
          >
            {user.username}
          </div>
        ))}
      </div>

      <div className="message-area">
        <div className="messages">
          {currentChat.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender_id === session.user.id ? 'sent' : 'received'}`}
            >
              {msg.content}
              <p className="message-time">{dateFormatter(msg.sent_at)}</p>
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            disabled={sendingMessage}
            onClick={handleSendMessage}
          >
            {sendingMessage ? <Loading/> : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
