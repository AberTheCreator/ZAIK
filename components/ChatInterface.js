import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = ({ userWallet, balances, onNavigate }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
  
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: `Hello! I'm ZAIK, your AI omnichain wallet assistant. Connected to wallet ${userWallet?.slice(0, 6)}...${userWallet?.slice(-4)}`,
        timestamp: new Date()
      },
      {
        id: 2,
        type: 'ai',
        content: 'You can ask me to:\n• Check your balances across chains\n• Transfer assets between networks\n• Swap tokens on DeFi protocols\n• Stake assets for yield\n\nTry: "Show my BTC balance" or "Swap 1 ETH for USDC"',
        timestamp: new Date()
      }
    ]);
  }, [userWallet]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);


    setTimeout(() => {
      const aiResponse = processAICommand(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const processAICommand = (command) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('balance')) {
      return generateBalanceResponse();
