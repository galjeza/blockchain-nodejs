const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2PServer = require('./p2p-server');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

// log the env variables
console.log('process.env.HTTP_PORT', process.env.HTTP_PORT);
console.log('process.env.P2P_PORT', process.env.P2P_PORT);
console.log('process.env.PEERS', process.env.PEERS);



const app = express();
app.use(bodyParser.json());

const bc = new Blockchain();
const p2pServer = new P2PServer(bc);
p2pServer.listen(); // Zagon p2p serverja

app.get('/blocks', (req, res) => {
    res.json(bc.chain); // vrne celotno verigo
})

app.post('/mine', (req, res) => { // ustvari nov block
    const block = bc.addBlock(req.body.data);
    console.log(`Nov blok je dodan: ${block.toString()}`);
    res.redirect('/blocks');  // vrne celotno verigo
    p2pServer.syncChain(); // Synchronizacija verig

})


app.listen(HTTP_PORT, () => console.log(`listening on port ${HTTP_PORT}`));
