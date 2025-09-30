# ZAIK - AI-Powered Omnichain Wallet Assistant

<div align="center">


**Seamless Cross-Chain Asset Management Through Natural Language**

[Features](#-features) • [Demo](https://youtu.be/l84jvrvqBAc?feature=shared) • [Website](https://zaik.netlify.app/) • 

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Usage Guide](#-usage-guide)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Support](#-support)

---

## 🌟 Overview

ZAIK (Zero-friction AI Krypto assistant) is a next-generation decentralized wallet interface that leverages artificial intelligence to simplify blockchain interactions. Built on cutting-edge Web3 technology, ZAIK enables users to manage multi-chain assets, execute complex DeFi operations, and perform cross-chain transactions using simple, natural language commands.

### Why ZAIK?

Traditional crypto wallets suffer from steep learning curves and fragmented user experiences. ZAIK eliminates these barriers by:

- **Simplifying Complexity**: Transform technical blockchain operations into conversational interactions
- **Unifying Multi-Chain**: Manage Bitcoin, Ethereum, Solana, Polygon, and BSC assets from a single interface
- **Enhancing Security**: Non-custodial design with user-controlled private keys
- **Accelerating Adoption**: Make Web3 accessible to both novices and experts

---

## 🚀 Key Features

### 🤖 AI-Powered Natural Language Interface
- Conversational command processing for blockchain operations
- Context-aware transaction suggestions
- Smart parsing of complex multi-step operations
- Real-time balance queries and portfolio analytics

### 🔗 Omnichain Asset Management
- **Supported Networks**: Bitcoin, Ethereum, Solana, Polygon, Binance Smart Chain
- Cross-chain asset transfers via ZetaChain protocol
- Unified balance tracking across all chains
- Real-time price feeds and portfolio valuation

### 💱 DeFi Integration
- **DEX Aggregation**: Best rate discovery across Uniswap, SushiSwap, PancakeSwap
- **Token Swaps**: Execute cross-chain swaps with automatic slippage protection
- **Yield Farming**: Stake assets across multiple protocols (ETH 2.0, Solana validators, Lido)
- **Liquidity Provision**: Manage LP positions with APY tracking

### 🔐 Security & Privacy
- Non-custodial architecture (keys never leave user's device)
- MetaMask and WalletConnect integration
- Transaction simulation before execution
- Biometric authentication support (coming soon)

### 📊 Portfolio Management
- Real-time multi-chain balance tracking
- Historical transaction analytics
- P&L calculations and tax reporting (coming soon)
- Custom alerts and notifications

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (React)                    │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Landing    │  │  Chat        │  │  Wallet    │ │
│  │  Page       │  │  Interface   │  │  Manager   │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│              Wallet Service Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Balance     │  │  Transaction │  │  DeFi     │ │
│  │  Aggregator  │  │  Manager     │  │  Gateway  │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│              Blockchain Layer                        │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐│
│  │ Bitcoin │ │ Ethereum │ │ Solana  │ │ Polygon  ││
│  │   RPC   │ │   RPC    │ │   RPC   │ │   RPC    ││
│  └─────────┘ └──────────┘ └─────────┘ └──────────┘│
└─────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology. | Purpose |
|-------|-----------  |---------|
| **Frontend** | React 18 | Component-based UI framework |
| **State Management** | React Hooks | Local state and side effects |
| **Styling** | Custom CSS | Modern, responsive design system |
| **Web3 Integration** | MetaMask API | Wallet connection and signing |
| **HTTP Client** | Axios | API communication |
| **Build Tool** | Create React App | Development and production builds |

---

## ⚡ Quick Start

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **MetaMask**: Browser extension ([Install](https://metamask.io/))
- **Git**: For version control ([Download](https://git-scm.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/zaik-wallet-assistant.git
cd zaik-wallet-assistant

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start
```

The application will launch at `http://localhost:3000`

### First Run

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Grant Permissions**: Authorize ZAIK to read your wallet address
3. **Start Chatting**: Begin interacting with the AI assistant

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Blockchain RPC Endpoints
REACT_APP_BITCOIN_RPC=https://blockstream.info/api
REACT_APP_ETHEREUM_RPC=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
REACT_APP_POLYGON_RPC=https://polygon-rpc.com
REACT_APP_SOLANA_RPC=https://api.mainnet-beta.solana.com
REACT_APP_BSC_RPC=https://bsc-dataseed.binance.org

# API Keys (Optional - Enhances functionality)
REACT_APP_ETHERSCAN_API_KEY=your_etherscan_api_key
REACT_APP_POLYGONSCAN_API_KEY=your_polygonscan_api_key
REACT_APP_BSCSCAN_API_KEY=your_bscscan_api_key
REACT_APP_COINGECKO_API_KEY=your_coingecko_api_key

# ZetaChain Integration
REACT_APP_ZETACHAIN_RPC=https://zetachain-evm.blockpi.network/v1/rpc/public
REACT_APP_ZETACHAIN_TESTNET_RPC=https://zetachain-athens-evm.blockpi.network/v1/rpc/public

# Application Settings
REACT_APP_ENV=development
REACT_APP_ENABLE_ANALYTICS=false
```

### Obtaining API Keys

- **Etherscan**: [https://etherscan.io/apis](https://etherscan.io/apis)
- **Infura**: [https://infura.io/](https://infura.io/)
- **CoinGecko**: [https://www.coingecko.com/en/api](https://www.coingecko.com/en/api)

---

## 📚 Usage Guide

### Natural Language Commands

ZAIK understands conversational commands across multiple categories:

#### Balance Queries
```
"Show my balances"
"What's my ETH balance?"
"How much Bitcoin do I have?"
"Total portfolio value"
```

#### Token Swaps
```
"Swap 1 ETH for USDC"
"Exchange 0.01 BTC to SOL"
"Convert 100 USDC to MATIC"
"Best rate for ETH to USDT"
```

#### Cross-Chain Transfers
```
"Send 100 USDC to 0x742d35Cc..."
"Transfer 0.1 BTC to Ethereum address"
"Move 50 SOL to my Phantom wallet"
```

#### DeFi Operations
```
"Stake my ETH"
"Show available staking options"
"Unstake 50 SOL"
"What are the best yield opportunities?"
```

### Navigation

| Section | Description | Shortcut |
|---------|-------------|----------|
| **Landing** | Welcome page with feature overview | Home button |
| **Chat Interface** | AI-powered command center | Main interaction hub |
| **Wallet** | Detailed balance and asset view | 💼 Wallet |
| **History** | Transaction logs and filters | 📊 History |
| **Settings** | User preferences and security | ⚙️ Settings |

---

## 🚀 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# The build folder contains deployable static files
```

### Deploy to Netlify

#### Method 1: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

#### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Add environment variables in Netlify dashboard
7. Click "Deploy site"

### Deploy to Vercel

#### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Method 2: GitHub Integration
1. Push code to GitHub
2. Log in to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Framework preset: **Create React App**
6. Add environment variables
7. Click "Deploy"

### Deploy to Custom Server

```bash
# Build the project
npm run build

# Serve using any static file server
npx serve -s build

# Or copy build folder to your server
scp -r build/* user@yourserver.com:/var/www/html/
```

---

## 🔌 API Reference

### Wallet Service

#### `getBalances(walletAddress)`
Retrieves token balances across all supported chains.

**Parameters:**
- `walletAddress` (string): User's wallet address

**Returns:**
```javascript
{
  BTC: { amount: "0.05", usdValue: 2125, chain: "Bitcoin" },
  ETH: { amount: "2.3", usdValue: 6095, chain: "Ethereum" },
  ...
}
```

#### `getTransactionHistory(walletAddress, page, limit)`
Fetches paginated transaction history.

**Parameters:**
- `walletAddress` (string): User's wallet address
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page (default: 50)

**Returns:**
```javascript
{
  transactions: [...],
  page: 1,
  total: 156,
  hasMore: true
}
```

#### `executeSwap(fromToken, toToken, amount, slippage)`
Executes token swap across supported DEXes.

**Parameters:**
- `fromToken` (string): Source token symbol
- `toToken` (string): Destination token symbol
- `amount` (string): Amount to swap
- `slippage` (number): Max slippage tolerance (default: 0.5)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/zaik-wallet-assistant.git
   cd zaik-wallet-assistant
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Ensure all tests pass

### Code Style Guidelines

- **JavaScript**: ES6+ syntax, functional components
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Comments**: JSDoc for functions, inline for complex logic
- **Formatting**: 2-space indentation, single quotes for strings

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint
```

---

## 🔒 Security

### Security Model

ZAIK implements a **non-custodial** security architecture:

- ✅ Private keys never leave the user's device
- ✅ All transactions require explicit user approval via MetaMask
- ✅ No backend storage of sensitive data
- ✅ Client-side encryption for local preferences
- ✅ Open-source codebase for community auditing

### Reporting Vulnerabilities

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email paulaber68@gmail.com with details
3. Allow 48 hours for initial response
4. Coordinate disclosure timeline with maintainers

### Best Practices for Users

- ✅ Always verify transaction details before signing
- ✅ Use hardware wallets for large holdings
- ✅ Keep your seed phrase offline and secure
- ✅ Enable biometric authentication when available
- ✅ Regularly review transaction history

---

## 🗺️ Roadmap

### Phase 1: Foundation (Q4 2025) ✅
- [x] Core wallet connection
- [x] Multi-chain balance tracking
- [x] Basic AI command processing
- [x] Transaction history viewer

### Phase 2: DeFi Integration (Q1 2026) 🚧
- [ ] DEX aggregation (Uniswap, PancakeSwap)
- [ ] Staking integration (ETH 2.0, Solana)
- [ ] Yield farming dashboard
- [ ] Portfolio analytics

### Phase 3: Advanced Features (Q2 2026) 📅
- [ ] Cross-chain swaps via ZetaChain
- [ ] NFT management and marketplace
- [ ] Advanced AI features (predictive analytics)
- [ ] Mobile app (iOS/Android)

### Phase 4: Enterprise (Q3 2026) 📅
- [ ] Multi-signature wallet support
- [ ] DAO governance integration
- [ ] White-label solution
- [ ] Enterprise API


---

## 💬 Support

### Support Channels
- **GitHub Issues**: For bug reports and feature requests
- **Email**: paulaber68@gmail.com 
- **Live Chat**: Available on [zaik](https://zaik.netlify.app/)

---

## 🙏 Acknowledgments

ZAIK is built on the shoulders of giants:

- **React Team** - For the amazing framework
- **MetaMask** - For pioneering Web3 wallets
- **ZetaChain** - For omnichain infrastructure
- **Ethers.js** - For Web3 utilities
- **OpenAI** - For AI inspiration
- **Web3 Community** - For continuous innovation

---

## ⚠️ Disclaimer

**ZAIK is currently in ALPHA development.**

- Use at your own risk
- Not financial advice
- Always verify transactions before approval
- Test with small amounts first
- Keep your seed phrases secure
- Audit smart contracts before interaction

---

<div align="center">

### Built with ❤️ for the Web3 Community

**[Website](https://zaik.netlify.app/)** 

⭐ Star us on GitHub — it helps!

</div>
