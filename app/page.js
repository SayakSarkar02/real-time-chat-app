"use client"

import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('User');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://62.146.226.137:3001/');
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    const handleChatMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat message', handleChatMessage);

    // Clean up the event listener when the component unmounts or socket changes
    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, [socket]);

  const sendMessage = useCallback(() => {
    if (socket && newMessage) {
      socket.emit('chat message', `${name}::${newMessage}`);
      setNewMessage('');
    }
  }, [socket, newMessage]);

  return (
    <div className='mx-auto w-[50%] bg-black flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-semibold text-center mt-10 mb-2 text-slate-200'>Ki App Bol toh etaa ???</h1>
      <div className='border-[1px] w-full border-black rounded-xl p-4'>
        <div className='bg-gray-200 mx-auto mb-2 rounded-md px-2 py-1 w-fit gap-2 flex flex-col mt-10'> No of messages: {messages.length}</div>
        <div className='p-2 rounded-xl bg-white/10 flex flex-col gap-1'>
        {messages.map((message, index) => (
          <div className={`bg-green-900/80 text-white rounded-lg py-1 px-2 w-fit min-w-28 ${name==message.split('::')[0] && "self-end flex flex-col items-end"}`} key={index}>
            <h3 className='text-green-500 font-bold text-sm '>{message.split('::')[0]}</h3>
            <h3 className='text-white '>{message.split('::')[1]}</h3>
          </div>
        ))}
        </div>

      </div>
      <div>
      <input
        type="text"
        placeholder='Enter Name'
        value={name}
        className='border-[1px] w-32 text-center text-green-500 bg-white/10 outline-green-500 border-black rounded-xl p-2 px-4 mt-5'
        onChange={(e) => setName(e.target.value)}
      />
      :
      <input
        type="text"
        placeholder='Send kor kichu'
        value={newMessage}
        className='border-[1px] bg-white/10 text-white outline-green-500 border-black rounded-xl p-2 mt-5'
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className='text-white bg-green-500 rounded-xl  px-4 py-2 ml-2' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Index;