const http = require("http");
const mongoose = require('mongoose');
const app = require("./app");
const port = 3000;

//create server
const server = http.createServer(app);

server.listen(port, () => {
    console.log('listening on port ' + port);
    mongoose.connect('mongodb+srv://yehuditg:yehuditgu@testing.9ljpbbt.mongodb.net/?retryWrites=true&w=majority');
    var db = mongoose.connection;
    db.on('connected', () => { console.log("MongoDB Connected!") })
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("connect db")
    });
})
