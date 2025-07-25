import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useChainId } from 'wagmi';
import { CONTRACT_ADDRESSES, VOTING_CONTRACT_ABI } from '../lib/web3-config';

export interface Post {
  id: bigint;
  content: string;
  author: string;
  timestamp: bigint;
  likes: bigint;
  dislikes: bigint;
  exists: boolean;
}

export function useCreatePost() {
  const chainId = useChainId();
  const votingAddress = CONTRACT_ADDRESSES.VOTING_CONTRACT[chainId as keyof typeof CONTRACT_ADDRESSES.VOTING_CONTRACT];

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createPost = (content: string, author: string) => {
    if (!votingAddress) {
      throw new Error('Voting contract not available on this network');
    }

    writeContract({
      address: votingAddress as `0x${string}`,
      abi: VOTING_CONTRACT_ABI,
      functionName: 'createPost',
      args: [content, author],
    });
  };

  return {
    createPost,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useVoteOnPost() {
  const chainId = useChainId();
  const votingAddress = CONTRACT_ADDRESSES.VOTING_CONTRACT[chainId as keyof typeof CONTRACT_ADDRESSES.VOTING_CONTRACT];

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const voteOnPost = (postId: bigint, isLike: boolean) => {
    if (!votingAddress) {
      throw new Error('Voting contract not available on this network');
    }

    writeContract({
      address: votingAddress as `0x${string}`,
      abi: VOTING_CONTRACT_ABI,
      functionName: 'voteOnPost',
      args: [postId, isLike],
    });
  };

  return {
    voteOnPost,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useGetPost(postId: bigint | undefined) {
  const chainId = useChainId();
  const votingAddress = CONTRACT_ADDRESSES.VOTING_CONTRACT[chainId as keyof typeof CONTRACT_ADDRESSES.VOTING_CONTRACT];

  return useReadContract({
    address: votingAddress as `0x${string}`,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getPost',
    args: postId ? [postId] : undefined,
    query: {
      enabled: !!postId && !!votingAddress,
      refetchInterval: 10000,
    },
  });
}

export function useGetRecentPosts(count: number = 10) {
  const chainId = useChainId();
  const votingAddress = CONTRACT_ADDRESSES.VOTING_CONTRACT[chainId as keyof typeof CONTRACT_ADDRESSES.VOTING_CONTRACT];

  return useReadContract({
    address: votingAddress as `0x${string}`,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getRecentPosts',
    args: [BigInt(count)],
    query: {
      enabled: !!votingAddress,
      refetchInterval: 15000, // Refetch every 15 seconds
    },
  });
}

export function useGetUserVote(postId: bigint | undefined, userAddress: `0x${string}` | undefined) {
  const chainId = useChainId();
  const votingAddress = CONTRACT_ADDRESSES.VOTING_CONTRACT[chainId as keyof typeof CONTRACT_ADDRESSES.VOTING_CONTRACT];

  return useReadContract({
    address: votingAddress as `0x${string}`,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getUserVote',
    args: postId && userAddress ? [postId, userAddress] : undefined,
    query: {
      enabled: !!postId && !!userAddress && !!votingAddress,
      refetchInterval: 5000,
    },
  });
}

// Helper function to format timestamp
export function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString();
}

// Helper function to format post for display
export function formatPost(post: Post) {
  return {
    ...post,
    id: Number(post.id),
    likes: Number(post.likes),
    dislikes: Number(post.dislikes),
    timestamp: Number(post.timestamp),
    formattedDate: formatTimestamp(post.timestamp),
    totalVotes: Number(post.likes) + Number(post.dislikes),
    likePercentage: Number(post.likes) + Number(post.dislikes) > 0 
      ? Math.round((Number(post.likes) / (Number(post.likes) + Number(post.dislikes))) * 100)
      : 0,
  };
}
