import http from 'http';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import UserRoute from './routes/userRoutes';

export class App {
    constructor() {
        this.startExpress();
        this.connectToMongoDB();
    }

    startExpress() {
        let server = express();

        // enable CORS
        server.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        //user body parser for payload parsing
        server.use(bodyParser.json()); 
        server.use(bodyParser.urlencoded({ extended: true })); 
        server.use(bodyParser.json({ type: 'application/vnd.api+json' }));

        // Configure routes
        server.use('/api/users', new UserRoute()._init());

        // start server
        server.listen(3000);
    }

    connectToMongoDB() {

        // connect to it
        mongoose.connect('mongodb://127.0.0.1/local');

        //Get the default connection
        var db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
}

new App();
