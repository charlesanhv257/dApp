// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DAppToken
 * @dev ERC-20 token for the dApp with minting capabilities
 */
contract DAppToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18; // 1 million tokens
    uint256 public constant MINT_RATE = 100 * 10**18; // 100 tokens per mint
    
    mapping(address => uint256) public lastMintTime;
    uint256 public mintCooldown = 24 hours;
    
    event TokensMinted(address indexed to, uint256 amount);
    
    constructor() ERC20("DApp Token", "DAPP") Ownable(msg.sender) {
        // Mint initial supply to owner
        _mint(msg.sender, 10000 * 10**18); // 10,000 tokens
    }
    
    /**
     * @dev Allows users to mint tokens with cooldown period
     */
    function mintTokens() external {
        require(
            block.timestamp >= lastMintTime[msg.sender] + mintCooldown,
            "Must wait for cooldown period"
        );
        require(
            totalSupply() + MINT_RATE <= MAX_SUPPLY,
            "Would exceed max supply"
        );
        
        lastMintTime[msg.sender] = block.timestamp;
        _mint(msg.sender, MINT_RATE);
        
        emit TokensMinted(msg.sender, MINT_RATE);
    }
    
    /**
     * @dev Owner can mint tokens without cooldown (for distribution)
     */
    function ownerMint(address to, uint256 amount) external onlyOwner {
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "Would exceed max supply"
        );
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @dev Get time until next mint is available
     */
    function timeUntilNextMint(address user) external view returns (uint256) {
        uint256 nextMintTime = lastMintTime[user] + mintCooldown;
        if (block.timestamp >= nextMintTime) {
            return 0;
        }
        return nextMintTime - block.timestamp;
    }
}
