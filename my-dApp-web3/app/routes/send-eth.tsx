import { useState } from "react";
import { Link } from "react-router";
import { WalletConnection } from "../components/WalletConnection";
import { useETH } from "../hooks/useETH";

export function meta() {
  return [
    { title: "Send ETH - Web3 dApp" },
    { name: "description", content: "Transfer ETH to other addresses" },
  ];
}

export default function SendETH() {
  const { balance, sendETH, isLoading } = useETH();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const handleSendETH = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTxHash("");

    try {
      const hash = await sendETH(recipient, amount);
      setTxHash(hash);
      setRecipient("");
      setAmount("");
    } catch (err: any) {
      setError(err.message || "Failed to send ETH");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
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
            💎 Send ETH
          </h1>
          <p className="text-lg text-gray-600">
            Transfer Ethereum to any address on the network
          </p>
        </header>

        {/* Wallet Connection */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <WalletConnection />
          </div>
        </div>

        {/* Send ETH Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Transfer ETH
            </h3>

            {/* Balance Display */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Your Balance</div>
              <div className="text-2xl font-bold text-gray-900">
                {balance ? `${parseFloat(balance).toFixed(4)} ETH` : "0.0000 ETH"}
              </div>
            </div>

            {/* Transfer Form */}
            <form onSubmit={handleSendETH} className="space-y-6">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.001"
                  step="0.001"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !recipient || !amount}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isLoading ? "Sending..." : "Send ETH"}
              </button>
            </form>

            {/* Transaction Result */}
            {txHash && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-800 mb-2">
                  Transaction Successful!
                </div>
                <div className="text-sm text-green-700 break-all">
                  Hash: {txHash}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm font-medium text-red-800">
                  Error: {error}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">💡 Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  Always double-check the recipient address before sending
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  Start with small amounts for new addresses
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  Keep some ETH for gas fees in future transactions
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  Transactions are irreversible once confirmed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
