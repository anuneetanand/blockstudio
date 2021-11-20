pragma solidity >=0.7.0 <0.9.0;

contract blockstudio {
    uint256 audienceIDTracker;
    uint256 artistIDTracker;
    uint256 songIDTracker;

    enum UserType {
        UNDEFINED,
        ARTIST,
        AUDIENCE
    }

    struct Artist {
        string name;
        uint256 artistID;
        uint256 rating;
        uint256[] songsPublished;
    }

    struct Audience {
        string name;
        uint256 audienceID;
        uint256[] songsPurchased;
    }

    struct Song {
        string songName;
        string artistName;
        string genre;
        string hash;
        uint256 songID;
        uint256 price;
        address payable artistAddress;
    }

    mapping(address => UserType) identifyUser;
    mapping(address => Artist) allArtists;
    mapping(address => Audience) allAudience;
    mapping(uint256 => Song) allSongs;

    constructor() {
        audienceIDTracker = 0;
        artistIDTracker = 0;
        songIDTracker = 0;
    }

    function checkUser() public view returns (UserType) {
        return identifyUser[msg.sender];
    }

    function addNewArtist(string memory _name) public {
        artistIDTracker += 1;

        Artist memory newArtist;
        newArtist.name = _name;
        newArtist.artistID = artistIDTracker;
        newArtist.rating = 0;

        allArtists[msg.sender] = newArtist;
        identifyUser[msg.sender] = UserType.ARTIST;
    }

    function addNewAudience(string memory _name) public {
        audienceIDTracker += 1;

        Audience memory newAudience;
        newAudience.name = _name;
        newAudience.audienceID = audienceIDTracker;

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
            allAudience[msg.sender].audienceID,
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
            allArtists[msg.sender].artistID,
            allArtists[msg.sender].rating,
            allArtists[msg.sender].songsPublished
        );
    }

    event songAdded(
        uint256 songID,
        string songName,
        string artistName,
        uint256 price
    );

    function addSong(
        string memory _name,
        string memory _genre,
        string memory _hash,
        uint256 _price
    ) public {
        require(identifyUser[msg.sender] == UserType.ARTIST);

        songIDTracker += 1;

        Song memory newSong;
        newSong.songID = songIDTracker;
        newSong.songName = _name;
        newSong.artistName = allArtists[msg.sender].name;
        newSong.genre = _genre;
        newSong.hash = _hash;
        newSong.price = _price;
        newSong.artistAddress = payable(msg.sender);

        allSongs[songIDTracker] = newSong;
        allArtists[msg.sender].songsPublished.push(songIDTracker);

        emit songAdded(
            newSong.songID,
            newSong.songName,
            newSong.artistName,
            newSong.price
        );
    }

    event songPurchased(
        uint256 songID,
        string songName,
        string audienceName,
        uint256 price
    );

    function buySong(uint256 _songID) external payable {
        require(identifyUser[msg.sender] == UserType.AUDIENCE);

        Song memory curSong = allSongs[_songID];

        require(msg.sender.balance > msg.value);

        // (bool success, ) = curSong.artistAddress.call{value: msg.value}("");
        // require(success, "Transfer failed.");
        curSong.artistAddress.transfer(msg.value);

        allAudience[msg.sender].songsPurchased.push(songIDTracker);

        emit songPurchased(
            curSong.songID,
            curSong.songName,
            allAudience[msg.sender].name,
            curSong.price
        );
    }

    // function getSongDetails() {

    // }
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
