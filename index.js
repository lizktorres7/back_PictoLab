require('dotenv').config();

const Server  = require('./class_models/server');


const SERVER = new Server() 

SERVER.listen()
