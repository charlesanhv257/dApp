# 🚀 Web3 dApp - React Router v7 + Blockchain

[![Deploy Status](https://img.shields.io/badge/Deploy-Ready-green)](https://github.com/charlesanhv257/dApp)
[![React Router](https://img.shields.io/badge/React%20Router-v7-blue)](https://reactrouter.com/)
[![Web3](https://img.shields.io/badge/Web3-Enabled-orange)](https://web3js.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Một ứng dụng phi tập trung (dApp) hoàn chỉnh được xây dựng với React Router DOM v7, Server-Side Rendering (SSR) và tích hợp Web3 blockchain.

![dApp Screenshot](./docs/screenshot.png)

## ✨ Tính năng chính

### 🔗 Web3 Integration
- 👛 **Wallet Connection**: MetaMask, WalletConnect, Coinbase Wallet
- 🌐 **Multi-network**: Ethereum Mainnet, Goerli, Sepolia
- ⚡ **Real-time**: Hiển thị số dư ETH và token theo thời gian thực

### 🪙 ERC-20 Token Management
- 🎯 **DApp Token (DAPP)**: Token ERC-20 với tính năng mint
- ⏰ **Mint Cooldown**: 100 token mỗi 24 giờ
- 💸 **Transfer**: Chuyển token giữa các địa chỉ
- 📊 **Analytics**: Theo dõi số dư và lịch sử giao dịch

### 🎨 NFT Collection
- 🖼️ **DApp NFT (DNFT)**: Collection NFT độc đáo
- ✨ **Custom Metadata**: Tạo NFT với metadata tùy chỉnh
- 💰 **Mint Price**: 0.01 ETH per NFT
- 🏆 **Ownership Proof**: Chứng minh quyền sở hữu on-chain

### 💎 ETH Transactions
- 📤 **Send ETH**: Gửi ETH đến bất kỳ địa chỉ nào
- ⛽ **Gas Estimation**: Ước tính phí gas tự động
- 🔄 **Real-time Status**: Theo dõi trạng thái giao dịch
- 📋 **Transaction History**: Lịch sử giao dịch chi tiết

### 🗳️ On-chain Voting
- ✍️ **Create Posts**: Tạo bài viết trên blockchain
- 👍👎 **Vote System**: Like/dislike posts
- 🔒 **Immutable**: Bản ghi không thể thay đổi
- 🌐 **Transparent**: Bỏ phiếu minh bạch và công khai

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React Router v7** - Server-Side Rendering
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Utility-first CSS
- ⚡ **Vite** - Lightning fast build tool

### Web3
- 🎣 **Wagmi** - React hooks for Ethereum
- 🔧 **Viem** - TypeScript Interface for Ethereum
- 📚 **Ethers.js** - Ethereum library
- 🌈 **RainbowKit** - Beautiful wallet connection
- 🔄 **React Query** - Powerful data fetching

### Blockchain
- ⚒️ **Hardhat** - Ethereum development environment
- 🛡️ **OpenZeppelin** - Secure smart contract library
- 📝 **Solidity** - Smart contract programming language

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm hoặc yarn
- MetaMask extension

### 1. Clone repository
\`\`\`bash
git clone https://github.com/charlesanhv257/dApp.git
cd dApp
\`\`\`

### 2. Install dependencies
\`\`\`bash
# Frontend
cd my-dApp-web3
npm install

# Blockchain
cd ../blockchain
npm install --legacy-peer-deps
\`\`\`

### 3. Start local blockchain
\`\`\`bash
cd blockchain
npx hardhat node
\`\`\`

### 4. Deploy contracts
\`\`\`bash
cd blockchain
npx hardhat ignition deploy ./ignition/modules/DAppContracts.js --network localhost
\`\`\`

### 5. Start frontend
\`\`\`bash
cd my-dApp-web3
npm run dev
\`\`\`

🎉 Open http://localhost:5173 in your browser!

## 📁 Project Structure

\`\`\`
dApp/
├── 📱 my-dApp-web3/          # React Router v7 Frontend
│   ├── app/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom Web3 hooks
│   │   ├── lib/             # Utilities & config
│   │   └── routes/          # App routes
│   ├── public/              # Static assets
│   └── package.json
├── ⛓️ blockchain/             # Smart Contracts
│   ├── contracts/           # Solidity contracts
│   ├── ignition/           # Deployment scripts
│   ├── test/               # Contract tests
│   └── hardhat.config.cjs
└── 📚 docs/                  # Documentation
\`\`\`

## 🔧 Smart Contracts

### DAppToken (DAPP)
- **Max Supply**: 1,000,000 tokens
- **Mint Rate**: 100 tokens per 24h
- **Cooldown**: Prevents spam minting

### DAppNFT (DNFT)
- **Max Supply**: 10,000 NFTs
- **Mint Price**: 0.01 ETH
- **Features**: Custom metadata, ownership tracking

### VotingContract
- **Features**: Create posts, vote, immutable records
- **Transparency**: All votes stored on-chain

## 🌐 Deployment

### Testnet (Sepolia)
\`\`\`bash
# Setup environment
cp blockchain/.env.example blockchain/.env
# Edit .env with your keys

# Deploy to Sepolia
cd blockchain
npx hardhat ignition deploy ./ignition/modules/DAppContracts.js --network sepolia
\`\`\`

### Production Build
\`\`\`bash
cd my-dApp-web3
npm run build
npm start
\`\`\`

## 🔒 Security

- ✅ OpenZeppelin battle-tested contracts
- ✅ ReentrancyGuard protection
- ✅ Access control mechanisms
- ✅ Input validation
- ✅ Environment variable protection

## 📊 Features Demo

| Feature | Status | Demo Link |
|---------|--------|-----------|
| 👛 Wallet Connection | ✅ | `/wallet` |
| 🪙 Token Management | ✅ | `/tokens` |
| 🎨 NFT Minting | ✅ | `/nft` |
| 💎 Send ETH | ✅ | `/send-eth` |
| 🗳️ Voting System | ✅ | `/voting` |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See \`LICENSE\` for more information.

## 👨‍💻 Author

**Charles ANH**
- GitHub: [@charlesanhv257](https://github.com/charlesanhv257)
- Project: [dApp Repository](https://github.com/charlesanhv257/dApp)

## 🙏 Acknowledgments

- [React Router](https://reactrouter.com/) - The React framework for the web
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [OpenZeppelin](https://openzeppelin.com/) - Secure smart contracts
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ using React Router v7, Web3, and modern blockchain technologies.
