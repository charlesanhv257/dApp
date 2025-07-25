// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DAppNFT
 * @dev NFT contract for the dApp with minting capabilities
 */
contract DAppNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId = 1;
    
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public mintPrice = 0.01 ether;
    uint256 public maxMintsPerAddress = 5;
    
    mapping(address => uint256) public mintedByAddress;
    
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event MintPriceUpdated(uint256 newPrice);
    
    constructor() ERC721("DApp NFT", "DNFT") Ownable(msg.sender) {
        // Start token IDs from 1
    }
    
    /**
     * @dev Public mint function
     */
    function mint(string memory tokenURI) external payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(
            mintedByAddress[msg.sender] < maxMintsPerAddress,
            "Exceeded max mints per address"
        );
        require(
            _nextTokenId <= MAX_SUPPLY,
            "Exceeded max supply"
        );
        
        uint256 tokenId = _nextTokenId++;
        mintedByAddress[msg.sender]++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(msg.sender, tokenId, tokenURI);
    }
    
    /**
     * @dev Owner can mint for free (for distribution)
     */
    function ownerMint(address to, string memory tokenURI) external onlyOwner {
        require(
            _nextTokenId <= MAX_SUPPLY,
            "Exceeded max supply"
        );
        
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(to, tokenId, tokenURI);
    }
    
    /**
     * @dev Update mint price (owner only)
     */
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }
    
    /**
     * @dev Update max mints per address (owner only)
     */
    function setMaxMintsPerAddress(uint256 newMax) external onlyOwner {
        maxMintsPerAddress = newMax;
    }
    
    /**
     * @dev Withdraw contract balance (owner only)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Get total minted tokens
     */
    function totalSupply() external view returns (uint256) {
        return _nextTokenId - 1;
    }
    
    /**
     * @dev Get tokens owned by an address
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        uint256 index = 0;
        
        for (uint256 tokenId = 1; tokenId < _nextTokenId; tokenId++) {
            if (ownerOf(tokenId) == owner) {
                tokenIds[index] = tokenId;
                index++;
            }
        }
        
        return tokenIds;
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
