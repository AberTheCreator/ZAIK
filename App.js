import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import WalletConnection from './components/WalletConnection';
import TransactionHistory from './components/TransactionHistory';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [walletConnected, setWalletConnected] = useState(false);
  const [userWallet, setUserWallet] = useState(null);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setUserWallet(accounts[0]);
          setWalletConnected(true);
          await fetchBalances(accounts[0]);
        }
      } catch (error) {
        console.error('Failed to check wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserWallet(accounts[0]);
        setWalletConnected(true);
        await fetchBalances(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error('Wallet connection failed:', error);
        throw error;
      }
    } else {
      throw new Error('Please install MetaMask or another Web3 wallet');
    }
  };

  const fetchBalances = async (address) => {
    
    const mockBalances = {
      BTC: { amount: '0.05', usdValue: 1250, chain: 'Bitcoin' },
      ETH: { amount: '2.3', usdValue: 3450, chain: 'Ethereum' },
      SOL: { amount: '150', usdValue: 2250, chain: 'Solana' },
      USDC: { amount: '1000', usdValue: 1000, chain: 'Ethereum' },
    };
    setBalances(mockBalances);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onStartChat={() => navigateToPage('chat')}
            onConnectWallet={connectWallet}
            walletConnected={walletConnected}
            userWallet={userWallet}
          />
        );
      case 'chat':
        return (
          <ChatInterface
            userWallet={userWallet}
            balances={balances}
            onNavigate={navigateToPage}
          />
        );
      case 'wallet':
        return (
          <WalletConnection
            onConnect={connectWallet}
            walletConnected={walletConnected}
            userWallet={userWallet}
            balances={balances}
            onNavigate={navigateToPage}
          />
        );
      case 'history':
        return (
          <TransactionHistory
            userWallet={userWallet}
            onNavigate={navigateToPage}
          />
        );
      case 'settings':
        return (
          <Settings
            userWallet={userWallet}
            onNavigate={navigateToPage}
          />
        );
      default:
        return <LandingPage onStartChat={() => navigateToPage('chat')} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App
