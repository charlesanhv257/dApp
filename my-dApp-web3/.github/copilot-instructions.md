# Copilot Instructions for Web3 dApp Project

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React Router DOM v7 (SSR) Web3 blockchain dApp project with the following features:

### Tech Stack
- **Frontend**: React Router DOM v7 with SSR, TypeScript, Tailwind CSS
- **Web3**: Ethers.js, Wagmi, Viem, RainbowKit for wallet connections
- **Smart Contracts**: Hardhat, OpenZeppelin contracts
- **Blockchain**: Ethereum testnets (Goerli, Sepolia)
- **RPC Providers**: Alchemy, Infura

### Key Features
1. **Wallet Connection**: Connect to MetaMask, WalletConnect, and other wallets
2. **ERC-20 Token Operations**: Display token balances, transfer tokens
3. **NFT Minting**: Mint NFTs from smart contracts
4. **ETH Transactions**: Send ETH transactions
5. **On-chain Voting**: Voting system stored on blockchain
6. **Multi-network Support**: Support for different Ethereum testnets

### Architecture Guidelines
- Use TypeScript for all files
- Implement proper error handling for Web3 operations
- Use React Query for caching blockchain data
- Follow React Router v7 patterns for SSR
- Use Tailwind CSS for styling
- Implement proper loading states for blockchain operations
- Use environment variables for sensitive data (API keys, private keys)

### Smart Contract Guidelines
- Use OpenZeppelin contracts for security
- Implement proper events for frontend integration
- Use Hardhat for development and testing
- Deploy to testnets first before mainnet

### Security Considerations
- Never expose private keys in frontend code
- Use environment variables for API keys
- Validate all user inputs
- Implement proper access controls in smart contracts
- Use established patterns from OpenZeppelin

### File Organization
- `/app/routes/` - React Router v7 routes
- `/app/components/` - Reusable React components
- `/app/hooks/` - Custom React hooks for Web3 operations
- `/app/lib/` - Utility functions and configurations
- `/contracts/` - Smart contract source files
- `/scripts/` - Deployment and utility scripts
