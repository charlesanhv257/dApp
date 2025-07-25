import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNFTBalance, useNFTInfo, useMintNFT, useUserNFTs, createSimpleTokenURI } from '../hooks/useNFT';

export function NFTMinting() {
  const { address, isConnected } = useAccount();
  const { data: nftBalance, refetch: refetchBalance } = useNFTBalance(address);
  const { name, symbol, totalSupply, mintPrice, contractAddress } = useNFTInfo();
  const { mintNFT, isPending, isConfirming, isConfirmed, error } = useMintNFT();
  const { tokenIds, count } = useUserNFTs(address);
  
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
      setShowSuccess(true);
      setNftName('');
      setNftDescription('');
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [isConfirmed, refetchBalance]);

  const handleMint = async () => {
    if (!nftName.trim() || !nftDescription.trim()) {
      alert('Please enter both name and description');
      return;
    }

    try {
      const tokenURI = createSimpleTokenURI(nftName.trim(), nftDescription.trim());
      await mintNFT(tokenURI, mintPrice);
    } catch (err) {
      console.error('Minting error:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          NFT Minting
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Connect your wallet to mint NFTs
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {name || 'DApp NFT'} ({symbol || 'DNFT'}) - Minting
      </h3>
      
      <div className="space-y-6">
        {/* NFT Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
              Your NFTs
            </h4>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {nftBalance?.toString() || '0'}
            </p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1">
              Total Minted
            </h4>
            <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
              {totalSupply}
            </p>
          </div>
          
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-pink-700 dark:text-pink-300 mb-1">
              Mint Price
            </h4>
            <p className="text-2xl font-bold text-pink-900 dark:text-pink-100">
              {mintPrice} ETH
            </p>
          </div>
        </div>

        {/* Minting Form */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Mint New NFT
          </h4>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="nft-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                NFT Name
              </label>
              <input
                id="nft-name"
                type="text"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                placeholder="Enter NFT name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                disabled={isPending || isConfirming}
              />
            </div>
            
            <div>
              <label htmlFor="nft-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="nft-description"
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
                placeholder="Enter NFT description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                disabled={isPending || isConfirming}
              />
            </div>
            
            <button
              onClick={handleMint}
              disabled={isPending || isConfirming || !nftName.trim() || !nftDescription.trim()}
              className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              {isPending || isConfirming 
                ? 'Minting...' 
                : `Mint NFT for ${mintPrice} ETH`
              }
            </button>
          </div>
        </div>

        {/* Your NFTs */}
        {count > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your NFTs ({count})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tokenIds.map((tokenId) => (
                <div
                  key={tokenId.toString()}
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center"
                >
                  <div className="w-full h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">#{tokenId.toString()}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Token #{tokenId.toString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">
              Error: {error.message}
            </p>
          </div>
        )}
        
        {showSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-green-700 dark:text-green-300 text-sm">
              NFT minted successfully! 🎉
            </p>
          </div>
        )}

        {contractAddress && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Contract: <span className="font-mono">{contractAddress}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
