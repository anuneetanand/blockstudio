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

    address public owner;

    constructor() {
        audienceIDTracker = 0;
        artistIDTracker = 0;
        owner = msg.sender;
    }

    function checkUser() external view returns (UserType) {
        return identifyUser[owner];
    }

    function addNewArtist(string memory _name) public {
        artistIDTracker += 1;

        Artist memory newArtist;
        newArtist.name = _name;
        newArtist.ArtistID = artistIDTracker;
        newArtist.rating = 0;

        allArtists[owner] = newArtist;
        identifyUser[owner] = UserType.ARTIST;
    }

    function addNewAudience(string memory _name) public {
        audienceIDTracker += 1;

        Audience memory newAudience;
        newAudience.name = _name;
        newAudience.AudienceID = audienceIDTracker;

        allAudience[owner] = newAudience;
        identifyUser[owner] = UserType.AUDIENCE;
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
            allAudience[owner].name,
            allAudience[owner].AudienceID,
            allAudience[owner].songsPurchased
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
            allArtists[owner].name,
            allArtists[owner].ArtistID,
            allArtists[owner].rating,
            allArtists[owner].songsPublished
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
