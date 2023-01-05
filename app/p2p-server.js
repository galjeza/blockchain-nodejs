 const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; // v primeru da je PEERS nastavljen, ga razdeli po vejicah in vrne array
const Websocket = require("ws");


class P2Pserver {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    connectToPeers() {
        peers.forEach(peer => {
            // ws://localhost:5001
            const socket = new Websocket(peer);

            socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');
        this.messageHandler(socket);
        this.sendChain(socket);
    }

    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
        });
    }

    sendChain(socket) { // Pošlje verigo
        socket.send(JSON.stringify(this.blockchain.chain)); // Pošlje verigo v JSON formatu
    }

    syncChain() { // Synchronizacija verig
        this.sockets.forEach(socket => this.sendChain(socket)); // Pošlje verigo vsem socketom
    }

}

module.exports = P2Pserver;