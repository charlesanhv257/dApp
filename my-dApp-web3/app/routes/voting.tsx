import { useState } from "react";
import { Link } from "react-router";
import { WalletConnection } from "../components/WalletConnection";
import { useVoting } from "../hooks/useVoting";

export function meta() {
  return [
    { title: "On-chain Voting - Web3 dApp" },
    { name: "description", content: "Create posts and vote on blockchain" },
  ];
}

export default function Voting() {
  const { createPost, voteOnPost, getRecentPosts, posts, isLoading } = useVoting();
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent || !newPostAuthor) return;
    
    try {
      await createPost(newPostContent, newPostAuthor);
      setNewPostContent("");
      setNewPostAuthor("");
      // Refresh posts
      getRecentPosts(10);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleVote = async (postId: number, isLike: boolean) => {
    try {
      await voteOnPost(postId, isLike);
      // Refresh posts after voting
      getRecentPosts(10);
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
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
            🗳️ On-chain Voting
          </h1>
          <p className="text-lg text-gray-600">
            Create posts and vote with your voice on the blockchain
          </p>
        </header>

        {/* Wallet Connection */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <WalletConnection />
          </div>
        </div>

        {/* Create Post Form */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Create New Post
            </h3>
            
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  value={newPostAuthor}
                  onChange={(e) => setNewPostAuthor(e.target.value)}
                  placeholder="Your name or username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <textarea
                  id="content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's on your mind? Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !newPostContent || !newPostAuthor}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isLoading ? "Creating Post..." : "Create Post on Blockchain"}
              </button>
            </form>
          </div>
        </div>

        {/* Posts List */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Recent Posts
              </h3>
              <button
                onClick={() => getRecentPosts(10)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Refresh
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No posts yet. Be the first to create a post!
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {post.author}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(post.timestamp * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Post #{post.id}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleVote(post.id, true)}
                          disabled={isLoading}
                          className="flex items-center space-x-2 text-green-600 hover:text-green-700 disabled:opacity-50"
                        >
                          <span>👍</span>
                          <span>{post.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => handleVote(post.id, false)}
                          disabled={isLoading}
                          className="flex items-center space-x-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          <span>👎</span>
                          <span>{post.dislikes}</span>
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        Total votes: {post.likes + post.dislikes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Voting Info */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-semibold mb-4">
              How Blockchain Voting Works
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">🔒 Immutable Records</h4>
                <p className="text-green-100">
                  All votes are permanently stored on the blockchain and cannot be altered
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🌐 Transparent</h4>
                <p className="text-green-100">
                  Anyone can verify vote counts and post authenticity
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">⚡ Real-time</h4>
                <p className="text-green-100">
                  Votes are counted instantly when transactions are confirmed
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔐 Secure</h4>
                <p className="text-green-100">
                  Protected by Ethereum's robust security and consensus mechanism
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
