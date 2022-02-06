<p align="center">
  <img width="320" alt="logo" src="https://user-images.githubusercontent.com/42066451/137000289-1b32bf57-c42c-469a-bdc2-cd068cf1ea67.png">
</p>

# About
A blockchain-based decentralized music streaming platform to connect music enthusiasts directly to independent music artists. The artists can use this platform to share their music with greater freedom while ensuring ownership and avoiding duplication of their music. People can listen to their favourite songs and support the artists by making micropayments through our custom crypto tokens. The platform can be hosted as a DApp on the Ethereum blockchain.

# Preview
<div>
<p align="center">
 <img width="720" alt="preview" src="https://user-images.githubusercontent.com/42066451/152672195-75fac9fe-2d35-4ac9-81f8-588ea236a083.png">
<p>
</div>

# Folder Structure
```
├── App
│   ├── contracts
│   │   ├── Migrations.sol
│   │   └── blockstudio.sol
│   ├── migrations
│   │   ├── 1_initial_migration.js
│   │   └── 2_deploy_contract.js
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── Assets
│   │   │   ├── Pixeboy.ttf
│   │   │   ├── logo.png
│   │   │   └── sample.mp3
│   │   ├── Build
│   │   │   ├── Migrations.json
│   │   │   └── blockstudio.json
│   │   ├── Components
│   │   │   ├── AddSongCard.js
│   │   │   ├── Artist.js
│   │   │   ├── Audience.js
│   │   │   ├── Colors.js
│   │   │   ├── Login.js
│   │   │   └── SongCard.js
│   │   └── index.js
│   └── truffle-config.js
├── Documents
│   ├── Literature_Review.pdf
│   ├── Presentation.pdf
│   └── Progress_Report.pdf
└── README.md
```
  
# Architecture
<div>
<p align="center">
  <img width="400" alt="logo" src="https://user-images.githubusercontent.com/42066451/137001059-84911c3f-aa63-4f91-a7f8-e61d39c44e53.png">
<p>
</div>

# Setup
- Install and setup Ganache, Truffle and Metamask
- Clone the repository
``` 
git clone https://github.com/anuneetanand/blockstudio.git
```
- Setup a workspace of blockstudio on Ganache
- Connect Metamask to the Ganache workspace
- Migrate the Contracts
```
truffle migrate
```
- Start the React App
```
npm start
```
- Add account to Metamask to Sign In
  
# Team
```
Anuneet Anand | Adwit Singh Kochar | Pankil Kalra
```
