import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useChainId } from 'wagmi';
import { CONTRACT_ADDRESSES, DAPP_NFT_ABI } from '../lib/web3-config';
import { parseEther, formatEther } from 'viem';

export function useNFTBalance(address: `0x${string}` | undefined) {
  const chainId = useChainId();
  const nftAddress = CONTRACT_ADDRESSES.DAPP_NFT[chainId];

  return useReadContract({
    address: nftAddress as `0x${string}`,
    abi: DAPP_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!nftAddress,
      refetchInterval: 10000,
    },
  });
}

export function useNFTInfo() {
  const chainId = useChainId();
  const nftAddress = CONTRACT_ADDRESSES.DAPP_NFT[chainId];

  const { data: name } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: DAPP_NFT_ABI,
    functionName: 'name',
    query: { enabled: !!nftAddress },
  });

  const { data: symbol } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: DAPP_NFT_ABI,
    functionName: 'symbol',
    query: { enabled: !!nftAddress },
  });

  const { data: totalSupply } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: DAPP_NFT_ABI,
    functionName: 'totalSupply',
    query: { enabled: !!nftAddress },
  });

  const { data: mintPrice } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: DAPP_NFT_ABI,
    functionName: 'mintPrice',
    query: { enabled: !!nftAddress },
  });

  return {
    name: name as string,
    symbol: symbol as string,
    totalSupply: totalSupply?.toString() || '0',
    mintPrice: mintPrice ? formatEther(mintPrice as bigint) : '0',
    contractAddress: nftAddress,
  };
}

export function useUserNFTs(address: `0x${string}` | undefined) {
  const chainId = useChainId();
  const nftAddress = CONTRACT_ADDRESSES.DAPP_NFT[chainId];

  const { data: tokenIds } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: DAPP_NFT_ABI,
    functionName: 'tokensOfOwner',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!nftAddress,
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  return {
    tokenIds: tokenIds as bigint[] || [],
    count: tokenIds ? (tokenIds as bigint[]).length : 0,
  };
}

export function useNFTMetadata(tokenId: bigint | undefined) {
  const chainId = useChainId();
  const nftAddress = CONTRACT_ADDRESSES.DAPP_NFT[chainId];

  return useReadContract({
    address: nftAddress as `0x${string}`,
    abi: DAPP_NFT_ABI,
    functionName: 'tokenURI',
    args: tokenId ? [tokenId] : undefined,
    query: {
      enabled: !!tokenId && !!nftAddress,
    },
  });
}

export function useMintNFT() {
  const chainId = useChainId();
  const nftAddress = CONTRACT_ADDRESSES.DAPP_NFT[chainId];

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const mintNFT = async (tokenURI: string, mintPrice: string) => {
    if (!nftAddress) {
      throw new Error('NFT contract not available on this network');
    }

    writeContract({
      address: nftAddress as `0x${string}`,
      abi: DAPP_NFT_ABI,
      functionName: 'mint',
      args: [tokenURI],
      value: parseEther(mintPrice),
    });
  };

  return {
    mintNFT,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

// Helper function to create a simple JSON metadata for NFT
export function createNFTMetadata(name: string, description: string, imageUrl?: string) {
  return {
    name,
    description,
    image: imageUrl || `https://via.placeholder.com/400x400?text=${encodeURIComponent(name)}`,
    attributes: [
      {
        trait_type: "Created",
        value: new Date().toISOString(),
      },
    ],
  };
}

// For simple demo, we can use a data URL or IPFS later
export function createSimpleTokenURI(name: string, description: string) {
  const metadata = createNFTMetadata(name, description);
  return `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
}
