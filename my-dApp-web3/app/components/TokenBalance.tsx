import { useAccount } from 'wagmi';
import { useTokenBalance, useTokenInfo, useMintTokens, useTimeUntilNextMint } from '../hooks/useToken';
import { formatEther } from 'viem';
import { useState, useEffect } from 'react';

export function TokenBalance() {
  const { address, isConnected } = useAccount();
  const { data: balance, refetch: refetchBalance } = useTokenBalance(address);
  const { name, symbol, totalSupply, contractAddress } = useTokenInfo();
  const { mintTokens, isPending, isConfirming, isConfirmed, error } = useMintTokens();
  const { data: timeUntilMint } = useTimeUntilNextMint(address);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (timeUntilMint) {
      setCountdown(Number(timeUntilMint));
    }
  }, [timeUntilMint]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
    }
  }, [isConfirmed, refetchBalance]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Token Balance
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Connect your wallet to view token balance
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {name || 'DApp Token'} ({symbol || 'DAPP'})
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
              Your Balance
            </h4>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {balance ? formatEther(balance as bigint) : '0'} {symbol}
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
              Total Supply
            </h4>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
              {totalSupply} {symbol}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Mint Tokens
          </h4>
          
          {countdown > 0 ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
                Next mint available in:
              </p>
              <p className="text-xl font-mono font-bold text-yellow-900 dark:text-yellow-100">
                {formatTime(countdown)}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Mint 100 {symbol} tokens (24-hour cooldown)
              </p>
              <button
                onClick={mintTokens}
                disabled={isPending || isConfirming}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {isPending || isConfirming ? 'Minting...' : 'Mint Tokens'}
              </button>
            </div>
          )}
          
          {error && (
            <div className="mt-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">
                Error: {error.message}
              </p>
            </div>
          )}
          
          {isConfirmed && (
            <div className="mt-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-green-700 dark:text-green-300 text-sm">
                Tokens minted successfully!
              </p>
            </div>
          )}
        </div>

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
