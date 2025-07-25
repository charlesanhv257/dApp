import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { 
  mainnet,
  sepolia,
  goerli,
  hardhat 
} from 'wagmi/chains';

// Define custom RPC URLs
const customSepolia = {
  ...sepolia,
  rpcUrls: {
    default: { http: ['https://eth-sepolia.g.alchemy.com/v2/your-alchemy-api-key'] },
    public: { http: ['https://eth-sepolia.g.alchemy.com/v2/your-alchemy-api-key'] },
  },
};

const customGoerli = {
  ...goerli,
  rpcUrls: {
    default: { http: ['https://eth-goerli.g.alchemy.com/v2/your-alchemy-api-key'] },
    public: { http: ['https://eth-goerli.g.alchemy.com/v2/your-alchemy-api-key'] },
  },
};

export const config = getDefaultConfig({
  appName: 'Web3 dApp',
  projectId: 'your-walletconnect-project-id', // Get from WalletConnect Cloud
  chains: [
    mainnet,
    customSepolia,
    customGoerli,
    ...(process.env.NODE_ENV === 'development' ? [hardhat] : []),
  ],
  ssr: true, // Enable SSR support
});

// Contract addresses - will be updated after deployment
export const CONTRACT_ADDRESSES = {
  DAPP_TOKEN: {
    [hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Local deployment
    [sepolia.id]: '', // Will be filled after Sepolia deployment
    [goerli.id]: '', // Will be filled after Goerli deployment
  },
  DAPP_NFT: {
    [hardhat.id]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // Local deployment
    [sepolia.id]: '', // Will be filled after Sepolia deployment
    [goerli.id]: '', // Will be filled after Goerli deployment
  },
  VOTING_CONTRACT: {
    [hardhat.id]: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // Local deployment
    [sepolia.id]: '', // Will be filled after Sepolia deployment
    [goerli.id]: '', // Will be filled after Goerli deployment
  },
};

// ABI imports - these will be generated after contract compilation
export const DAPP_TOKEN_ABI = [
  // Basic ERC-20 functions
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol", 
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"type": "uint8"}],
    "stateMutability": "view", 
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "address"}],
    "name": "balanceOf",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "address"}, {"type": "uint256"}],
    "name": "transfer",
    "outputs": [{"type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Custom functions
  {
    "inputs": [],
    "name": "mintTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "address"}],
    "name": "timeUntilNextMint",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
];

export const DAPP_NFT_ABI = [
  // Basic ERC-721 functions
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "address"}],
    "name": "balanceOf",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  // Custom functions
  {
    "inputs": [{"type": "string"}],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "address"}],
    "name": "tokensOfOwner",
    "outputs": [{"type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
];

export const VOTING_CONTRACT_ABI = [
  {
    "inputs": [{"type": "string"}, {"type": "string"}],
    "name": "createPost",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256"}, {"type": "bool"}],
    "name": "voteOnPost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256"}],
    "name": "getPost",
    "outputs": [{"type": "tuple", "components": [
      {"type": "uint256", "name": "id"},
      {"type": "string", "name": "content"},
      {"type": "string", "name": "author"},
      {"type": "uint256", "name": "timestamp"},
      {"type": "uint256", "name": "likes"},
      {"type": "uint256", "name": "dislikes"},
      {"type": "bool", "name": "exists"}
    ]}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256"}],
    "name": "getRecentPosts",
    "outputs": [{"type": "tuple[]", "components": [
      {"type": "uint256", "name": "id"},
      {"type": "string", "name": "content"},
      {"type": "string", "name": "author"},
      {"type": "uint256", "name": "timestamp"},
      {"type": "uint256", "name": "likes"},
      {"type": "uint256", "name": "dislikes"},
      {"type": "bool", "name": "exists"}
    ]}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256"}, {"type": "address"}],
    "name": "getUserVote",
    "outputs": [{"type": "bool"}, {"type": "bool"}],
    "stateMutability": "view", 
    "type": "function"
  },
];
