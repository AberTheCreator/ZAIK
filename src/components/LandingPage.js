 import React from 'react';

const LandingPage = ({ onStartChat, onConnectWallet, walletConnected, userWallet }) => {
  const handleStartChat = () => {
    if (!walletConnected) {
      alert('Please connect your wallet first to start using ZAIK.');
      return;
    }
    onStartChat();
  };

  const handleConnectWallet = async () => {
    try {
      await onConnectWallet();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="landing-page">
      <div className="bg-animation">
        <div className="floating-shapes shape1"></div>
        <div className="floating-shapes shape2"></div>
        <div className="floating-shapes shape3"></div>
        <div className="floating-shapes shape4"></div>
      </div>

      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo">ZAIK</div>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#docs">Docs</a></li>
              <li><a href="#about">About</a></li>
            </ul>
            <button className="connect-wallet" onClick={handleConnectWallet}>
              {walletConnected 
                ? `${userWallet?.slice(0, 6)}...${userWallet?.slice(-4)}` 
                : 'Connect Wallet'
              }
            </button>
          </nav>
        </div>
      </header>

      <main className="hero">
        <div className="container">
          <div className="hero-badge">Alpha Release • Web3 AI Assistant</div>
          
          <h1 className="hero-title">ZAIK</h1>
          
          <p className="hero-subtitle">
            Enter the ultimate AI-powered omnichain wallet assistant.<br />
            <span className="highlight">Execute cross-chain transactions</span>, explore DeFi opportunities, and
            manage your assets with natural language commands.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleStartChat}>
              Start Chatting
            </button>
            <a href="#features" className="btn-secondary">Learn More</a>
          </div>
          
          <div className="features" id="features">
            <div className="feature">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI-Powered</h3>
              <p className="feature-desc">Natural Language Processing for seamless blockchain interactions</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔗</div>
              <h3 className="feature-title">Omnichain</h3>
              <p className="feature-desc">Cross-chain asset management via ZetaChain's unified protocol</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Instant Execution</h3>
              <p className="feature-desc">Fast, secure transactions across Bitcoin, Ethereum, Solana, and more</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
