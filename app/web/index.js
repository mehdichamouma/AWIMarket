/**
 * REST API Service
 *
 * Serve:
 *  - the REST JSON API at /api
 *  - the static files at /
 */



//ExpressJS
import express from "express"
import {Server} from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

//API endpoints
import api from "./api" //API Router

import {decodeToken} from "../services/authentification"

//DB Services
import * as graphDb from "../persistence/db"
import * as fake from "../persistence/fake"
import getDbInstance, {configureDbService} from "../persistence"

//Application config
import config from "../../config"

//Websockets
import configureWebsockets from "./websockets"

let app = express();
let server = Server(app)

//WEB SOCKETS
configureWebsockets(server)

//WEBPACK HOT RELOADING CONFIGURATION
var webpack = require('webpack');
var webpackConfig = require('../../webpack.config');
var webpackDevMiddleware = require("webpack-dev-middleware")
var webpackHotMiddleware = require("webpack-hot-middleware")
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
}))

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}))

//Database configuration
graphDb.initDb(config.DB_URL)
configureDbService([graphDb, fake])

//REST API configuration

//Accept JSON

app.use(bodyParser.json());
app.use(cookieParser())

// middleware to create the user
app.use(function (req, res, next) {
  if(req.headers.authorization) {
    req.user = decodeToken(req.headers.authorization)
  }
  else {
    req.user = null
  }
  console.log("Request from user : " + JSON.stringify(req.user))
  next()
});

//Check all URI:
//if a corresponding file is found in /public directory, it will be served as static content
//Used for serving the index.html and assets (CSS, js, img)
app.use("/", express.static('public'))


//Let `api` handle all endpoints beginning by /api
app.use("/api", api)

//Start listening for HTTP Request
var port = config.PORT;
server.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
