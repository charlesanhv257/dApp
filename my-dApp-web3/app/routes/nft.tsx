import { Link } from "react-router";
import { WalletConnection } from "../components/WalletConnection";
import { NFTMinting } from "../components/NFTMinting";

export function meta() {
  return [
    { title: "NFT Collection - Web3 dApp" },
    { name: "description", content: "Mint and manage your NFT collection" },
  ];
}

export default function NFT() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
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
            🎨 NFT Collection
          </h1>
          <p className="text-lg text-gray-600">
            Create unique digital assets on the blockchain
          </p>
        </header>

        {/* Wallet Connection */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <WalletConnection />
          </div>
        </div>

        {/* NFT Minting Component */}
        <div className="max-w-4xl mx-auto">
          <NFTMinting />
        </div>

        {/* NFT Collection Info */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              DApp NFT Collection (DNFT)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10,000</div>
                <div className="text-gray-600">Max Supply</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">0.01 ETH</div>
                <div className="text-gray-600">Mint Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">5</div>
                <div className="text-gray-600">Max per Wallet</div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Collection Features</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-3">🖼️</span>
                  <div>
                    <h5 className="font-medium text-gray-900">Custom Metadata</h5>
                    <p className="text-sm text-gray-600">Upload your own images and descriptions</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-3">🔒</span>
                  <div>
                    <h5 className="font-medium text-gray-900">Ownership Proof</h5>
                    <p className="text-sm text-gray-600">Immutable blockchain ownership records</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-3">💫</span>
                  <div>
                    <h5 className="font-medium text-gray-900">Transfer & Trade</h5>
                    <p className="text-sm text-gray-600">Send to other wallets or list on marketplaces</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-3">📈</span>
                  <div>
                    <h5 className="font-medium text-gray-900">Royalties</h5>
                    <p className="text-sm text-gray-600">Creator royalties on secondary sales</p>
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
