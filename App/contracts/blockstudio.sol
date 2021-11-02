pragma solidity >=0.7.0 <0.9.0;

contract blockstudio {
    uint256 audienceIDTracker;
    uint256 artistIDTracker;

    enum UserType {
        UNDEFINED,
        ARTIST,
        AUDIENCE
    }

    struct Artist {
        string name;
        uint256 ArtistID;
        uint256 rating;
        uint256[] songsPublished;
    }

    struct Audience {
        string name;
        uint256 AudienceID;
        uint256[] songsPurchased;
    }

    mapping(address => UserType) identifyUser;
    mapping(address => Artist) allArtists;
    mapping(address => Audience) allAudience;

    constructor() {
        audienceIDTracker = 0;
        artistIDTracker = 0;
    }

    function checkUser() public view returns (UserType) {
        return identifyUser[msg.sender];
    }

    function addNewArtist(string memory _name) public {
        artistIDTracker += 1;

        Artist memory newArtist;
        newArtist.name = _name;
        newArtist.ArtistID = artistIDTracker;
        newArtist.rating = 0;

        allArtists[msg.sender] = newArtist;
        identifyUser[msg.sender] = UserType.ARTIST;
    }

    function addNewAudience(string memory _name) public {
        audienceIDTracker += 1;

        Audience memory newAudience;
        newAudience.name = _name;
        newAudience.AudienceID = audienceIDTracker;

        allAudience[msg.sender] = newAudience;
        identifyUser[msg.sender] = UserType.AUDIENCE;
    }

    function getAudienceDetails()
        public
        view
        returns (
            string memory,
            uint256,
            uint256[] memory
        )
    {
        return (
            allAudience[msg.sender].name,
            allAudience[msg.sender].AudienceID,
            allAudience[msg.sender].songsPurchased
        );
    }

    function getArtistDetails()
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256[] memory
        )
    {
        return (
            allArtists[msg.sender].name,
            allArtists[msg.sender].ArtistID,
            allArtists[msg.sender].rating,
            allArtists[msg.sender].songsPublished
        );
    }
}

// contract User {
//     address walletID;
//     string public name;
//     bool newUser;

//     // constructor() public (){

//     // }

//     // function buyToken() {

//     // }

// }

// contract Artist is User {
//     uint ArtistID;
//     uint public rating;
//     uint[] songsPublished;

//     // function addSong() {

//     // }
// }

// contract Audience is User {
//     uint AudienceID;
//     uint[] songsPurchased;

//     // function buySong(uint SongID) {

//     // }

//     // function sponserArtist(uint ArtistID) {

//     // }
// }

// contract Song {
//     uint public SongID;
//     string public name;
//     uint public ArtistID;
//     string public genre;
//     uint public releaseDate;
//     uint cost;

// }
