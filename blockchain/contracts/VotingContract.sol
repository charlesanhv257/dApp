// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title VotingContract
 * @dev On-chain voting system for posts with like/dislike functionality
 */
contract VotingContract is Ownable, ReentrancyGuard {
    struct Post {
        uint256 id;
        string content;
        string author;
        uint256 timestamp;
        uint256 likes;
        uint256 dislikes;
        bool exists;
    }
    
    struct Vote {
        bool hasVoted;
        bool isLike; // true for like, false for dislike
    }
    
    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => Vote)) public votes; // postId => user => vote
    mapping(address => uint256[]) public userPosts; // user => postIds
    
    uint256 public nextPostId = 1;
    uint256 public totalPosts = 0;
    
    event PostCreated(
        uint256 indexed postId,
        string content,
        string author,
        address indexed creator,
        uint256 timestamp
    );
    
    event VoteCasted(
        uint256 indexed postId,
        address indexed voter,
        bool isLike,
        uint256 newLikes,
        uint256 newDislikes
    );
    
    event VoteChanged(
        uint256 indexed postId,
        address indexed voter,
        bool oldVote,
        bool newVote,
        uint256 newLikes,
        uint256 newDislikes
    );
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Create a new post
     */
    function createPost(string memory content, string memory author) external returns (uint256) {
        require(bytes(content).length > 0, "Content cannot be empty");
        require(bytes(author).length > 0, "Author cannot be empty");
        
        uint256 postId = nextPostId++;
        
        posts[postId] = Post({
            id: postId,
            content: content,
            author: author,
            timestamp: block.timestamp,
            likes: 0,
            dislikes: 0,
            exists: true
        });
        
        userPosts[msg.sender].push(postId);
        totalPosts++;
        
        emit PostCreated(postId, content, author, msg.sender, block.timestamp);
        
        return postId;
    }
    
    /**
     * @dev Vote on a post (like or dislike)
     */
    function voteOnPost(uint256 postId, bool isLike) external nonReentrant {
        require(posts[postId].exists, "Post does not exist");
        
        Vote storage userVote = votes[postId][msg.sender];
        Post storage post = posts[postId];
        
        if (userVote.hasVoted) {
            // User is changing their vote
            if (userVote.isLike != isLike) {
                if (userVote.isLike) {
                    // Was like, now dislike
                    post.likes--;
                    post.dislikes++;
                } else {
                    // Was dislike, now like
                    post.dislikes--;
                    post.likes++;
                }
                
                userVote.isLike = isLike;
                
                emit VoteChanged(postId, msg.sender, !isLike, isLike, post.likes, post.dislikes);
            }
            // If same vote, do nothing
        } else {
            // User is voting for the first time
            userVote.hasVoted = true;
            userVote.isLike = isLike;
            
            if (isLike) {
                post.likes++;
            } else {
                post.dislikes++;
            }
            
            emit VoteCasted(postId, msg.sender, isLike, post.likes, post.dislikes);
        }
    }
    
    /**
     * @dev Remove vote from a post
     */
    function removeVote(uint256 postId) external {
        require(posts[postId].exists, "Post does not exist");
        require(votes[postId][msg.sender].hasVoted, "User has not voted");
        
        Vote storage userVote = votes[postId][msg.sender];
        Post storage post = posts[postId];
        
        if (userVote.isLike) {
            post.likes--;
        } else {
            post.dislikes--;
        }
        
        delete votes[postId][msg.sender];
        
        emit VoteCasted(postId, msg.sender, false, post.likes, post.dislikes);
    }
    
    /**
     * @dev Get post details
     */
    function getPost(uint256 postId) external view returns (Post memory) {
        require(posts[postId].exists, "Post does not exist");
        return posts[postId];
    }
    
    /**
     * @dev Get user's vote on a post
     */
    function getUserVote(uint256 postId, address user) external view returns (bool hasVoted, bool isLike) {
        Vote memory vote = votes[postId][user];
        return (vote.hasVoted, vote.isLike);
    }
    
    /**
     * @dev Get posts created by a user
     */
    function getUserPosts(address user) external view returns (uint256[] memory) {
        return userPosts[user];
    }
    
    /**
     * @dev Get recent posts (last n posts)
     */
    function getRecentPosts(uint256 count) external view returns (Post[] memory) {
        require(count > 0, "Count must be greater than 0");
        
        uint256 actualCount = count > totalPosts ? totalPosts : count;
        Post[] memory recentPosts = new Post[](actualCount);
        
        uint256 currentIndex = 0;
        for (uint256 i = nextPostId - 1; i > 0 && currentIndex < actualCount; i--) {
            if (posts[i].exists) {
                recentPosts[currentIndex] = posts[i];
                currentIndex++;
            }
        }
        
        return recentPosts;
    }
    
    /**
     * @dev Get vote statistics for a post
     */
    function getVoteStats(uint256 postId) external view returns (uint256 likes, uint256 dislikes, uint256 total) {
        require(posts[postId].exists, "Post does not exist");
        Post memory post = posts[postId];
        return (post.likes, post.dislikes, post.likes + post.dislikes);
    }
    
    /**
     * @dev Owner can delete a post (moderation)
     */
    function deletePost(uint256 postId) external onlyOwner {
        require(posts[postId].exists, "Post does not exist");
        delete posts[postId];
        totalPosts--;
    }
}
