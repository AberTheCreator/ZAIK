import React, { useState } from 'react';

const Settings = ({ userWallet, onNavigate }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSlippage: '0.5',
    defaultChain: 'ethereum',
    darkMode: true,
    advancedMode: false,
    gasPreference: 'standard'
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
 
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    setSettings({
      notifications: true,
      autoSlippage: '0.5',
      defaultChain: 'ethereum',
      darkMode: true,
      advancedMode: false,
      gasPreference: 'standard'
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <button className="back-button" onClick={() => onNavigate('chat')}>
          ← Back to Chat
        </button>

        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Customize your ZAIK experience</p>
        </div>

        <div className="settings-content">
          <div className="settings-tabs">
            <button 
              className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button 
              className={`settings-tab ${activeTab === 'trading' ? 'active' : ''}`}
              onClick={() => setActiveTab('trading')}
            >
              Trading
            </button>
            <button 
              className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </div>

          <div className="settings-panels">
            {activeTab === 'general' && (
              <div className="settings-panel">
                <div className="settings-section">
                  <h3 className="section-title">Interface</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Dark Mode</span>
                      <span className="setting-description">Use dark theme</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Notifications</span>
                      <span className="setting-description">Enable desktop notifications</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Advanced Mode</span>
                      <span className="setting-description">Show advanced trading features</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.advancedMode}
                        onChange={(e) => handleSettingChange('advancedMode', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-title">Default Chain</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Preferred Network</span>
                      <span className="setting-description">Default blockchain for transactions</span>
                    </div>
                    <select
                      className="setting-select"
                      value={settings.defaultChain}
                      onChange={(e) => handleSettingChange('defaultChain', e.target.value)}
                    >
                      <option value="ethereum">Ethereum</option>
                      <option value="polygon">Polygon</option>
                      <option value="bsc">BSC</option>
                      <option value="solana">Solana</option>
                      <option value="bitcoin">Bitcoin</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trading' && (
              <div className="settings-panel">
                <div className="settings-section">
                  <h3 className="section-title">Trading Preferences</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Default Slippage</span>
                      <span className="setting-description">Automatic slippage tolerance (%)</span>
                    </div>
                    <input
                      type="number"
                      className="setting-input"
                      value={settings.autoSlippage}
                      onChange={(e) => handleSettingChange('autoSlippage', e.target.value)}
                      min="0.1"
                      max="5"
                      step="0.1"
                    />
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Gas Price Preference</span>
                      <span className="setting-description">Default gas price setting</span>
                    </div>
                    <select
                      className="setting-select"
                      value={settings.gasPreference}
                      onChange={(e) => handleSettingChange('gasPreference', e.target.value)}
                    >
                      <option value="slow">Slow (Low fees)</option>
                      <option value="standard">Standard</option>
                      <option value="fast">Fast (High fees)</option>
                    </select>
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-title">Risk Management</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Transaction Confirmations</span>
                      <span className="setting-description">Require confirmations before executing</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-panel">
                <div className="settings-section">
                  <h3 className="section-title">Wallet Security</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Connected Wallet</span>
                      <span className="setting-description">
                        {userWallet ? `${userWallet.slice(0, 8)}...${userWallet.slice(-6)}` : 'Not connected'}
                      </span>
                    </div>
                    <button className="setting-button">
                      View Details
                    </button>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Session Timeout</span>
                      <span className="setting-description">Auto-logout after inactivity</span>
                    </div>
                    <select className="setting-select" defaultValue="30">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-title">Privacy</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <span className="setting-label">Analytics</span>
                      <span className="setting-description">Share usage data to improve ZAIK</span>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked={true} />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="settings-actions">
            <button className="btn-secondary" onClick={resetSettings}>
              Reset to Defaults
            </button>
            <button className="btn-primary" onClick={saveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
