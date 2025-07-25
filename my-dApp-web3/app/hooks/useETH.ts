import { useSendTransaction, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { parseEther, formatEther } from 'viem';

export function useSendETH() {
  const { sendTransaction, data: hash, isPending, error } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const sendETH = (to: string, amount: string) => {
    sendTransaction({
      to: to as `0x${string}`,
      value: parseEther(amount),
    });
  };

  return {
    sendETH,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useETHBalance(address: `0x${string}` | undefined) {
  const { data, isError, isLoading, refetch } = useBalance({
    address,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  return {
    balance: data ? formatEther(data.value) : '0',
    symbol: data?.symbol || 'ETH',
    decimals: data?.decimals || 18,
    formatted: data?.formatted || '0',
    isError,
    isLoading,
    refetch,
  };
}

// Helper function to validate Ethereum address
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Helper function to format ETH amount for display
export function formatETHAmount(amount: string, decimals: number = 4): string {
  const num = parseFloat(amount);
  if (num === 0) return '0';
  if (num < 0.0001) return '< 0.0001';
  return num.toFixed(decimals);
}

// Helper function to validate ETH amount
export function isValidETHAmount(amount: string): boolean {
  try {
    const num = parseFloat(amount);
    return num > 0 && !isNaN(num) && isFinite(num);
  } catch {
    return false;
  }
}
