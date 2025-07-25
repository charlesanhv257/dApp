import type { Route } from "./+types/home";
import { Link } from "react-router";
import { WalletConnection } from "../components/WalletConnection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Web3 dApp - Blockchain Dashboard" },
    { name: "description", content: "Decentralized Application with Web3 features" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Web3 dApp Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore blockchain features with React Router v7 & SSR
          </p>
          <WalletConnection />
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Wallet Management */}
          <Link 
            to="/wallet" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="text-3xl mb-4">👛</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Wallet Management
            </h3>
            <p className="text-gray-600">
              Connect wallets, view addresses, and manage multiple accounts
            </p>
          </Link>

          {/* Token Operations */}
          <Link 
            to="/tokens" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="text-3xl mb-4">🪙</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ERC-20 Tokens
            </h3>
            <p className="text-gray-600">
              View token balances, mint tokens, and transfer between accounts
            </p>
          </Link>

          {/* NFT Minting */}
          <Link 
            to="/nft" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              NFT Collection
            </h3>
            <p className="text-gray-600">
              Mint unique NFTs, view your collection, and manage metadata
            </p>
          </Link>

          {/* ETH Transactions */}
          <Link 
            to="/send-eth" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="text-3xl mb-4">💎</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Send ETH
            </h3>
            <p className="text-gray-600">
              Transfer ETH between addresses with gas fee estimation
            </p>
          </Link>

          {/* Voting System */}
          <Link 
            to="/voting" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="text-3xl mb-4">🗳️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              On-chain Voting
            </h3>
            <p className="text-gray-600">
              Create posts, vote on content, and see results on blockchain
            </p>
          </Link>

          {/* Blockchain Info */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
            <div className="text-3xl mb-4">⛓️</div>
            <h3 className="text-xl font-semibold mb-2">
              Network Status
            </h3>
            <p className="text-purple-100">
              Currently connected to Ethereum testnet with smart contracts deployed
            </p>
          </div>
        </div>

        {/* Tech Stack Info */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Built with Modern Web3 Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
              React Router v7
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              TypeScript
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
              Wagmi & Viem
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium">
              Ethers.js
            </span>
            <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">
              Hardhat
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium">
              OpenZeppelin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
