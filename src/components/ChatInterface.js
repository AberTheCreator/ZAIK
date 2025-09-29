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
    } else if (lowerCommand.includes('swap') || lowerCommand.includes('exchange')) {
      return generateSwapResponse(command);
    } else if (lowerCommand.includes('transfer') || lowerCommand.includes('send')) {
      return generateTransferResponse(command);
    } else if (lowerCommand.includes('stake') || lowerCommand.includes('yield')) {
      return generateStakeResponse();
    } else if (lowerCommand.includes('help')) {
      return generateHelpResponse();
    } else {
      return `I understand you want to: "${command}"\n\nI can help you with:\n• Checking balances\n• Transferring assets\n• Swapping tokens\n• Staking for yield\n• DeFi interactions\n\nCould you be more specific about what you'd like to do?`;
    }
  };

  const generateBalanceResponse = () => {
    const totalValue = Object.values(balances).reduce((sum, asset) => sum + asset.usdValue, 0);
    let response = ' Here are your current balances:\n\n';
    
    Object.entries(balances).forEach(([symbol, data]) => {
      response += `• ${symbol}: ${data.amount} ${symbol} ($${data.usdValue.toLocaleString()})\n`;
    });
    
    response += `\nTotal Portfolio Value: $${totalValue.toLocaleString()}`;
    return response;
  };

  const generateSwapResponse = (command) => {
    return `🔄 I can help you swap tokens! \n\nFor the command: "${command}"\n\nI'll:\n1. Check best rates across DEXes\n2. Execute via ZetaChain omnichain contracts\n3. Confirm transaction\n\n⚠️ This is a demo. In production, I would:\n• Parse exact amounts and tokens\n• Check liquidity and rates\n• Execute the swap transaction\n• Provide real-time status updates`;
  };

  const generateTransferResponse = (command) => {
    return ` I can help you transfer assets cross-chain!\n\nFor: "${command}"\n\nProcess:\n1. Verify destination address\n2. Calculate cross-chain fees\n3. Execute via ZetaChain TSS\n4. Provide transaction hash\n\n⚠️ Demo mode: Please provide specific:\n• Amount and token\n• Destination address\n• Target blockchain`;
  };

  const generateStakeResponse = () => {
    return `🌾 Current staking opportunities:\n\n• ETH 2.0 Staking: 4.2% APY\n• SOL Staking: 6.8% APY\n• BTC Lightning Pool: 3.5% APY\n• DeFi Liquidity Pools: 8-15% APY\n\nWhich asset would you like to stake?\nWhat's your risk tolerance (Low/Medium/High)?`;
  };

  const generateHelpResponse = () => {
    return `🤖 ZAIK AI Assistant Commands:\n\n BALANCE COMMANDS:\n• "Show my balances"\n• "What's my ETH balance?"\n• "Portfolio value"\n\n💱 SWAP COMMANDS:\n• "Swap 1 ETH for USDC"\n• "Exchange 0.01 BTC to SOL"\n• "Best rate for ETH to MATIC"\n\n💸 TRANSFER COMMANDS:\n• "Send 100 USDC to [address]"\n• "Transfer 0.1 BTC to Ethereum"\n\n🌾 STAKING COMMANDS:\n• "Stake my ETH"\n• "Show staking options"\n• "Unstake 50 SOL"\n\nJust ask naturally - I'll understand! 😊`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedCommands = [
    "Show my balances",
    "Swap 1 ETH for USDC",
    "Send 0.1 BTC to Ethereum",
    "What are my staking options?"
  ];

  return (
    <div className="chat-interface">
      
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-title">
            <h2>ZAIK AI Assistant</h2>
            <span className="wallet-info">
              Connected: {userWallet?.slice(0, 6)}...{userWallet?.slice(-4)}
            </span>
          </div>
          <div className="chat-nav">
            <button className="nav-btn" onClick={() => onNavigate('wallet')}>
              💼 Wallet
            </button>
            <button className="nav-btn" onClick={() => onNavigate('history')}>
              📊 History
            </button>
            <button className="nav-btn" onClick={() => onNavigate('settings')}>
              ⚙️ Settings
            </button>
            <button className="nav-btn close-btn" onClick={() => onNavigate('landing')}>
              ✕
            </button>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              <div className="message-text">
                {message.content.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < message.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai typing">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-actions">
        {suggestedCommands.map((command, index) => (
          <button
            key={index}
            className="quick-action-btn"
            onClick={() => setInputValue(command)}
          >
            {command}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your command here... (e.g., 'Show my balances' or 'Swap 1 ETH for USDC')"
            className="message-input"
            rows="1"
          />
          <button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
          >
            {isTyping ? '⏳' : '🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
