import React, { useState, useEffect } from 'react';

const WalletConnection = ({ onConnect, walletConnected, userWallet, balances, onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  useEffect(() => {
    if (balances) {
      const total = Object.values(balances).reduce((sum, asset) => sum + asset.usdValue, 0);
      setTotalPortfolioValue(total);
    }
  }, [balances]);

  const handleConnect = async () => {
    setLoading(true);
    setError('');
    try {
      await onConnect();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDisconnect = () => {
    if (window.ethereum) {
      window.location.reload();
    }
  };

  const copyAddress = () => {
    if (userWallet) {
      navigator.clipboard.writeText(userWallet);
      alert('Address copied to clipboard!');
    }
  };

  return (
    <div className="wallet-connection">
      <div className="wallet-container">
        <button className="back-button" onClick={() => onNavigate('chat')}>
          ← Back to Chat
        </button>

        <div className="wallet-header">
          <h1 className="wallet-title">Wallet Management</h1>
          <p className="wallet-subtitle">Manage your connected wallet and view balances</p>
        </div>

        {!walletConnected ? (
          <div className="wallet-content">
            <div className="wallet-info">
              <h3 className="section-title">Connect Your Wallet</h3>
              <p style={{ color: '#a1a1aa', marginBottom: '20px' }}>
                Connect your Web3 wallet to start using ZAIK's AI-powered features
              </p>
              <button 
                className="btn-primary" 
                onClick={handleConnect}
                disabled={loading}
              >
                {loading ? '⏳ Connecting...' : '🔗 Connect Wallet'}
              </button>
              {error && (
                <p style={{ color: '#fca5a5', marginTop: '15px' }}>
                  {error}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="wallet-content">
              <div className="wallet-info">
                <h3 className="section-title">Wallet Information</h3>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value" style={{ color: '#6ee7b7' }}>🟢 Connected</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Address</span>
                  <span className="info-value" onClick={copyAddress} style={{ cursor: 'pointer' }}>
                    {userWallet?.slice(0, 8)}...{userWallet?.slice(-6)} 📋
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Network</span>
                  <span className="info-value">Ethereum Mainnet</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">{new Date().toLocaleTimeString()}</span>
                </div>
                <button 
                  className="btn-secondary" 
                  onClick={handleDisconnect}
                  style={{ marginTop: '20px', width: '100%' }}
                >
                  Disconnect Wallet
                </button>
              </div>

              <div className="balance-overview">
                <h3 className="section-title">Portfolio Overview</h3>
                <div className="info-item">
                  <span className="info-label">Total Value</span>
                  <span className="info-value" style={{ color: '#4f46e5', fontSize: '24px' }}>
                    ${totalPortfolioValue.toLocaleString()}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Assets</span>
                  <span className="info-value">{Object.keys(balances).length} tokens</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Chains</span>
                  <span className="info-value">4 networks</span>
                </div>
              </div>
            </div>

            <div className="balance-grid">
              {Object.entries(balances).map(([symbol, data]) => (
                <div key={symbol} className="balance-card">
                  <div className="balance-symbol">{symbol}</div>
                  <div className="balance-amount">{data.amount} {symbol}</div>
                  <div className="balance-usd">${data.usdValue.toLocaleString()}</div>
                  <div className="balance-chain">{data.chain}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletConnection;
