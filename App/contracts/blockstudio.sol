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
        uint256[] songsPublished;
    }

    struct Audience {
        string name;
        uint256 audienceID;
        uint256[] songsPurchased;
        mapping(uint256 => bool) isSongPurchased;
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
    mapping(uint256 => uint256) timesSongPurchased;
    mapping(string => bool) songHashUsed;
    mapping(string => address payable) getArtistAddress;

    constructor() {
        audienceIDTracker = 0;
        artistIDTracker = 0;
        songIDTracker = 0;
    }

    function getNumSongs() public view returns (uint256) {
        return songIDTracker;
    }

    function checkUser() public view returns (UserType) {
        return identifyUser[msg.sender];
    }

    function addNewArtist(string memory _name) public {
        artistIDTracker += 1;

        Artist memory newArtist;
        newArtist.name = _name;
        newArtist.artistID = artistIDTracker;
        getArtistAddress[_name] = payable(msg.sender);

        allArtists[msg.sender] = newArtist;
        identifyUser[msg.sender] = UserType.ARTIST;
    }

    function addNewAudience(string memory _name) public {
        audienceIDTracker += 1;

        Audience storage newAudience = allAudience[msg.sender];
        newAudience.name = _name;
        newAudience.audienceID = audienceIDTracker;

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
            uint256[] memory
        )
    {
        return (
            allArtists[msg.sender].name,
            allArtists[msg.sender].artistID,
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
        require(identifyUser[msg.sender] == UserType.ARTIST, "Not an artist.");
        require(
            !songHashUsed[_hash],
            "Duplicate detected. Song hash already in use."
        );

        songIDTracker += 1;

        Song memory newSong;
        newSong.songID = songIDTracker;
        newSong.songName = _name;
        newSong.artistName = allArtists[msg.sender].name;
        newSong.genre = _genre;
        newSong.hash = _hash;
        newSong.price = _price;
        newSong.artistAddress = payable(msg.sender);

        timesSongPurchased[songIDTracker] = 0;

        allSongs[songIDTracker] = newSong;
        allArtists[msg.sender].songsPublished.push(songIDTracker);
        songHashUsed[_hash] = true;

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

    function buySong(uint256 _songID) public payable {
        require(
            identifyUser[msg.sender] == UserType.AUDIENCE,
            "Not an audience member."
        );
        require(
            !allAudience[msg.sender].isSongPurchased[_songID],
            "Cannot buy the song twice."
        );

        Song memory curSong = allSongs[_songID];

        require(
            msg.value == (curSong.price * 1 wei),
            "Amount payed does not match price of the song."
        );
        require(msg.sender.balance > msg.value, "Insufficient balance.");

        curSong.artistAddress.transfer(msg.value);
        timesSongPurchased[_songID] += 1;

        allAudience[msg.sender].songsPurchased.push(_songID);
        allAudience[msg.sender].isSongPurchased[_songID] = true;

        emit songPurchased(
            curSong.songID,
            curSong.songName,
            allAudience[msg.sender].name,
            msg.value
        );
    }

    event artistDonated(string artistName, string audienceName, uint256 amount);

    function donateArtist(string memory artistName) public payable {
        require(
            identifyUser[msg.sender] == UserType.AUDIENCE,
            "Not an audience member."
        );
        require(msg.sender.balance > msg.value, "Insufficient balance.");

        getArtistAddress[artistName].transfer(msg.value);

        emit artistDonated(artistName, allAudience[msg.sender].name, msg.value);
    }

    function getSongDetails(uint256 _songID)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            allSongs[_songID].songName,
            allSongs[_songID].artistName,
            allSongs[_songID].genre,
            allSongs[_songID].hash,
            allSongs[_songID].price,
            timesSongPurchased[_songID]
        );
    }
}
