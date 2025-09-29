import React, { useState, useEffect } from 'react';

const TransactionHistory = ({ userWallet, onNavigate }) => {
  const [transactions, setTransactions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactionHistory();
  }, [userWallet]);

  const fetchTransactionHistory = async () => {
    setLoading(true);
    
    const mockTransactions = [
      {
        id: 'tx_001',
        type: 'swap',
        hash: '0x1234567890abcdef1234567890abcdef12345678',
        from: 'ETH',
        to: 'USDC',
        amount: '1.0',
        received: '2650.00',
        fee: '0.005 ETH',
        status: 'completed',
        timestamp: new Date(Date.now() - 3600000),
        chain: 'Ethereum',
        protocol: 'Uniswap V3'
      },
      {
        id: 'tx_002',
        type: 'transfer',
        hash: '0xabcdef1234567890abcdef1234567890abcdef12',
        from: 'BTC',
        to: 'BTC',
        amount: '0.01',
        recipient: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        fee: '0.0001 BTC',
        status: 'completed',
        timestamp: new Date(Date.now() - 7200000),
        chain: 'Bitcoin'
      },
      {
        id: 'tx_003',
        type: 'stake',
        hash: '0x9876543210fedcba9876543210fedcba98765432',
        asset: 'SOL',
        amount: '100',
        validator: 'Solana Labs',
        apy: '6.8%',
        status: 'active',
        timestamp: new Date(Date.now() - 86400000),
        chain: 'Solana'
      },
      {
        id: 'tx_004',
        type: 'swap',
        hash: '0x5555666677778888999900001111222233334444',
        from: 'USDC',
        to: 'MATIC',
        amount: '500',
        received: '588.24',
        fee: '2.5 USDC',
        status: 'pending',
        timestamp: new Date(Date.now() - 1800000),
        chain: 'Polygon',
        protocol: 'QuickSwap'
      },
      {
        id: 'tx_005',
        type: 'transfer',
        hash: '0xaaaa bbbb cccc dddd eeee ffff 1111 2222',
        from: 'ETH',
        to: 'ETH',
        amount: '0.5',
        recipient: '0x742d35Cc6634C0532925a3b8D87C2E0c',
        fee: '0.002 ETH',
        status: 'failed',
        timestamp: new Date(Date.now() - 10800000),
        chain: 'Ethereum'
      },
      {
        id: 'tx_006',
        type: 'unstake',
        hash: '0x1111222233334444555566667777888899990000',
        asset: 'ETH',
        amount: '0.8',
        validator: 'Lido',
        rewards: '0.032 ETH',
        status: 'completed',
        timestamp: new Date(Date.now() - 172800000),
        chain: 'Ethereum'
      }
    ];

    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  };

  const filterTransactions = () => {
    if (activeFilter === 'all') return transactions;
    return transactions.filter(tx => tx.type === activeFilter);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      case 'active': return 'status-completed';
      default: return 'status-pending';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'swap': return '🔄';
      case 'transfer': return '💸';
      case 'stake': return '🌾';
      case 'unstake': return '📤';
      default: return '📊';
    }
  };

  const formatHash = (hash) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  const openEtherscan = (hash, chain) => {
    let baseUrl = 'https://etherscan.io/tx/';
    if (chain === 'Polygon') baseUrl = 'https://polygonscan.com/tx/';
    if (chain === 'Bitcoin') baseUrl = 'https://blockstream.info/tx/';
    if (chain === 'Solana') baseUrl = 'https://explorer.solana.com/tx/';
    
    window.open(baseUrl + hash, '_blank');
  };

  return (
    <div className="transaction-history">
      <div className="history-container">
        <button className="back-button" onClick={() => onNavigate('chat')}>
          ← Back to Chat
        </button>

        <div className="history-header">
          <h1 className="history-title">Transaction History</h1>
          <div className="filter-tabs">
            {['all', 'swap', 'transfer', 'stake', 'unstake'].map(filter => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#a1a1aa' }}>
            <div>⏳ Loading transaction history...</div>
          </div>
        ) : (
          <div className="transaction-list">
            {filterTransactions().map(tx => (
              <div key={tx.id} className="transaction-item">
                <div className="transaction-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{getTransactionIcon(tx.type)}</span>
                    <span className="transaction-type">{tx.type}</span>
                  </div>
                  <span className={`transaction-status ${getStatusClass(tx.status)}`}>
                    {tx.status}
                  </span>
                </div>

                <div className="transaction-details">
                  <div className="detail-item">
                    <span className="detail-label">Transaction Hash</span>
                    <span 
                      className="detail-value" 
                      style={{ cursor: 'pointer', color: '#4f46e5' }}
                      onClick={() => openEtherscan(tx.hash, tx.chain)}
                    >
                      {formatHash(tx.hash)} 🔗
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Chain</span>
                    <span className="detail-value">{tx.chain}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Time</span>
                    <span className="detail-value">
                      {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  {tx.type === 'swap' && (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">Swap</span>
                        <span className="detail-value">
                          {tx.amount} {tx.from} → {tx.received} {tx.to}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Protocol</span>
                        <span className="detail-value">{tx.protocol}</span>
                      </div>
                    </>
                  )}

                  {tx.type === 'transfer' && (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">Amount</span>
                        <span className="detail-value">{tx.amount} {tx.from}</span>
                      </div>
                      {tx.recipient && (
                        <div className="detail-item">
                          <span className="detail-label">Recipient</span>
                          <span className="detail-value">{formatHash(tx.recipient)}</span>
                        </div>
                      )}
                    </>
                  )}

                  {(tx.type === 'stake' || tx.type === 'unstake') && (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">Amount</span>
                        <span className="detail-value">{tx.amount} {tx.asset}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Validator</span>
                        <span className="detail-value">{tx.validator}</span>
                      </div>
                      {tx.apy && (
                        <div className="detail-item">
                          <span className="detail-label">APY</span>
                          <span className="detail-value">{tx.apy}</span>
                        </div>
                      )}
                      {tx.rewards && (
                        <div className="detail-item">
                          <span className="detail-label">Rewards</span>
                          <span className="detail-value">{tx.rewards}</span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="detail-item">
                    <span className="detail-label">Fee</span>
                    <span className="detail-value">{tx.fee}</span>
                  </div>
                </div>
              </div>
            ))}

            {filterTransactions().length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#a1a1aa' }}>
                <div>📭 No transactions found for the selected filter</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
