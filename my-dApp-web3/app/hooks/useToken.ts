import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useChainId } from 'wagmi';
import { CONTRACT_ADDRESSES, DAPP_TOKEN_ABI } from '../lib/web3-config';
import { parseEther, formatEther } from 'viem';

export function useTokenBalance(address: `0x${string}` | undefined) {
  const chainId = useChainId();
  const tokenAddress = CONTRACT_ADDRESSES.DAPP_TOKEN[chainId];

  return useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: DAPP_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!tokenAddress,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });
}

export function useTokenInfo() {
  const chainId = useChainId();
  const tokenAddress = CONTRACT_ADDRESSES.DAPP_TOKEN[chainId];

  const { data: name } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: DAPP_TOKEN_ABI,
    functionName: 'name',
    query: { enabled: !!tokenAddress },
  });

  const { data: symbol } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: DAPP_TOKEN_ABI,
    functionName: 'symbol',
    query: { enabled: !!tokenAddress },
  });

  const { data: totalSupply } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: DAPP_TOKEN_ABI,
    functionName: 'totalSupply',
    query: { enabled: !!tokenAddress },
  });

  return {
    name: name as string,
    symbol: symbol as string,
    totalSupply: totalSupply ? formatEther(totalSupply as bigint) : '0',
    contractAddress: tokenAddress,
  };
}

export function useMintTokens() {
  const chainId = useChainId();
  const tokenAddress = CONTRACT_ADDRESSES.DAPP_TOKEN[chainId];

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const mintTokens = () => {
    if (!tokenAddress) {
      throw new Error('Token contract not available on this network');
    }

    writeContract({
      address: tokenAddress as `0x${string}`,
      abi: DAPP_TOKEN_ABI,
      functionName: 'mintTokens',
    });
  };

  return {
    mintTokens,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useTimeUntilNextMint(address: `0x${string}` | undefined) {
  const chainId = useChainId();
  const tokenAddress = CONTRACT_ADDRESSES.DAPP_TOKEN[chainId];

  return useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: DAPP_TOKEN_ABI,
    functionName: 'timeUntilNextMint',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!tokenAddress,
      refetchInterval: 1000, // Refetch every second for countdown
    },
  });
}

export function useTransferTokens() {
  const chainId = useChainId();
  const tokenAddress = CONTRACT_ADDRESSES.DAPP_TOKEN[chainId];

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const transferTokens = (to: string, amount: string) => {
    if (!tokenAddress) {
      throw new Error('Token contract not available on this network');
    }

    writeContract({
      address: tokenAddress as `0x${string}`,
      abi: DAPP_TOKEN_ABI,
      functionName: 'transfer',
      args: [to as `0x${string}`, parseEther(amount)],
    });
  };

  return {
    transferTokens,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
