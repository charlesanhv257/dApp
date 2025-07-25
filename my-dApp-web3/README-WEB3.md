# 🚀 Web3 dApp - React Router v7 + Blockchain

Một ứng dụng phi tập trung (dApp) được xây dựng với React Router DOM v7, SSR và tích hợp Web3 blockchain hoàn chỉnh.

## ✨ Tính năng chính

### 🔗 Web3 Integration
- **Kết nối ví**: MetaMask, WalletConnect, Coinbase Wallet
- **Multi-network**: Hỗ trợ Ethereum Mainnet, Goerli, Sepolia
- **Real-time balance**: Hiển thị số dư ETH và token theo thời gian thực

### 🪙 ERC-20 Token Management
- **DApp Token (DAPP)**: Token ERC-20 tùy chỉnh
- **Mint tokens**: 100 token mỗi 24 giờ
- **Transfer**: Chuyển token giữa các địa chỉ
- **Balance tracking**: Theo dõi số dư token

### 🎨 NFT Collection
- **DApp NFT (DNFT)**: Collection NFT độc đáo
- **Mint NFTs**: Tạo NFT với metadata tùy chỉnh
- **Collection management**: Quản lý collection cá nhân
- **Ownership proof**: Chứng minh quyền sở hữu on-chain

### 💎 ETH Transactions
- **Send ETH**: Gửi ETH đến bất kỳ địa chỉ nào
- **Gas estimation**: Ước tính phí gas
- **Transaction history**: Lịch sử giao dịch
- **Real-time confirmation**: Xác nhận giao dịch real-time

### 🗳️ On-chain Voting
- **Create posts**: Tạo bài viết trên blockchain
- **Vote system**: Like/dislike posts
- **Immutable records**: Bản ghi không thể thay đổi
- **Transparent voting**: Bỏ phiếu minh bạch

## 🛠️ Tech Stack

### Frontend
- **React Router v7**: Server-Side Rendering (SSR)
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **Vite**: Build tool

### Web3
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Interface for Ethereum
- **Ethers.js**: Ethereum library
- **RainbowKit**: Wallet connection UI
- **React Query**: Data fetching and caching

### Blockchain
- **Hardhat**: Development environment
- **OpenZeppelin**: Smart contract library
- **Solidity**: Smart contract language

## 🚀 Khởi chạy dự án

### Prerequisites
- Node.js 18+
- npm hoặc yarn
- MetaMask hoặc wallet khác

### 1. Clone và cài đặt dependencies

```bash
# Frontend
cd my-dApp-web3
npm install

# Blockchain
cd ../blockchain
npm install --legacy-peer-deps
```

### 2. Khởi động Hardhat local node

```bash
cd blockchain
npx hardhat node
```

### 3. Deploy smart contracts

```bash
cd blockchain
npx hardhat ignition deploy ./ignition/modules/DAppContracts.js --network localhost
```

### 4. Khởi động frontend

```bash
cd my-dApp-web3
npm run dev
```

Mở http://localhost:5173 trong trình duyệt.

## 📋 Smart Contracts

### DAppToken (DAPP)
- **Address**: Sẽ được hiển thị sau khi deploy
- **Symbol**: DAPP
- **Decimals**: 18
- **Max Supply**: 1,000,000 tokens
- **Mint Rate**: 100 tokens per 24h

### DAppNFT (DNFT)
- **Address**: Sẽ được hiển thị sau khi deploy
- **Symbol**: DNFT
- **Max Supply**: 10,000 NFTs
- **Mint Price**: 0.01 ETH
- **Max per wallet**: 5 NFTs

### VotingContract
- **Address**: Sẽ được hiển thị sau khi deploy
- **Features**: Create posts, vote, view results
- **Immutable**: Tất cả dữ liệu được lưu on-chain

## 🌐 Testnet Deployment

### Cấu hình Environment Variables

Tạo file `.env` trong thư mục `blockchain`:

```env
PRIVATE_KEY=your_private_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### Deploy lên Sepolia Testnet

```bash
cd blockchain
npx hardhat ignition deploy ./ignition/modules/DAppContracts.js --network sepolia
```

### Verify Contracts

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

## 📱 Sử dụng ứng dụng

### 1. Kết nối ví
- Click "Connect Wallet" trên trang chủ
- Chọn MetaMask hoặc ví khác
- Approve kết nối

### 2. Mint Tokens
- Truy cập trang "ERC-20 Tokens"
- Click "Mint Tokens" (100 DAPP mỗi 24h)
- Confirm transaction

### 3. Mint NFT
- Truy cập trang "NFT Collection"
- Điền metadata (tên, mô tả, image URL)
- Pay 0.01 ETH để mint
- Confirm transaction

### 4. Send ETH
- Truy cập trang "Send ETH"
- Điền địa chỉ người nhận và số lượng
- Confirm transaction

### 5. Voting
- Truy cập trang "On-chain Voting"
- Tạo post mới hoặc vote cho post có sẵn
- Tất cả được lưu trên blockchain

## 🔧 Development

### Project Structure

```
my-dApp-web3/
├── app/
│   ├── components/          # React components
│   ├── hooks/              # Custom Web3 hooks
│   ├── lib/               # Utility functions
│   ├── routes/            # React Router v7 routes
│   └── root.tsx           # Root component with providers
├── blockchain/
│   ├── contracts/         # Solidity smart contracts
│   ├── ignition/         # Deployment scripts
│   └── test/             # Contract tests
└── public/               # Static assets
```

### Available Scripts

#### Frontend
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run typecheck` - TypeScript checking

#### Blockchain
- `npm run compile` - Compile contracts
- `npm run test` - Run tests
- `npm run node` - Start local node
- `npm run deploy:localhost` - Deploy to localhost
- `npm run deploy:sepolia` - Deploy to Sepolia

## 🔒 Security

### Smart Contract Security
- ✅ OpenZeppelin contracts
- ✅ ReentrancyGuard
- ✅ Access control (Ownable)
- ✅ Input validation
- ✅ Gas optimization

### Frontend Security
- ✅ Environment variables
- ✅ Input sanitization
- ✅ Error handling
- ✅ HTTPS only in production

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 📞 Support

- **Documentation**: [React Router v7](https://reactrouter.com)
- **Web3 Integration**: [Wagmi](https://wagmi.sh)
- **Smart Contracts**: [Hardhat](https://hardhat.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)

---

Built with ❤️ using React Router v7, Web3, and modern blockchain technologies.
