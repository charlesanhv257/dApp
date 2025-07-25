import type { Route } from "./+types/wallet";
import { Link } from "react-router";
import { WalletConnection } from "../components/WalletConnection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wallet Management - Web3 dApp" },
    { name: "description", content: "Connect and manage your Web3 wallets" },
  ];
}

export default function Wallet() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            👛 Wallet Management
          </h1>
          <p className="text-lg text-gray-600">
            Connect your wallet to interact with the blockchain
          </p>
        </header>

        {/* Wallet Connection Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <WalletConnection />
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Supported Wallets
              </h3>
              <div className="grid gap-4">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl mr-4">🦊</div>
                  <div>
                    <h4 className="font-medium text-gray-900">MetaMask</h4>
                    <p className="text-sm text-gray-600">
                      The most popular Ethereum wallet
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl mr-4">🔗</div>
                  <div>
                    <h4 className="font-medium text-gray-900">WalletConnect</h4>
                    <p className="text-sm text-gray-600">
                      Connect mobile wallets via QR code
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl mr-4">🏦</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Coinbase Wallet</h4>
                    <p className="text-sm text-gray-600">
                      Self-custody wallet from Coinbase
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Network Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Network:</span>
                    <span className="ml-2 text-gray-600">Ethereum Mainnet / Testnet</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Chain ID:</span>
                    <span className="ml-2 text-gray-600">1 (Mainnet) / 11155111 (Sepolia)</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Currency:</span>
                    <span className="ml-2 text-gray-600">ETH</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Explorer:</span>
                    <span className="ml-2 text-gray-600">Etherscan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
