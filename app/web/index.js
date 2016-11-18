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
import socketIO from "socket.io"

//API endpoints
import api from "./api" //API Router

//DB Services
import * as graphDb from "../persistence/db"
import * as fake from "../persistence/fake"
import getDbInstance, {configureDbService} from "../persistence"

//Application config
import config from "../../config"


let app = express();
let server = Server(app)
let io = socketIO(server)

io.on('connection', (socket) => {
  console.log('ok');
  let ping = (sc) => {
    sc.emit("message", 'ping')
    setTimeout(() => pong(sc), 300)
  }
  let pong = (sc) => {
    sc.emit("message", 'pong')
    setTimeout(() => ping(sc), 300)
  }
  socket.on('sendMessages', () => {
    ping(socket)
  })
  socket.emit('ok', {yes: 'ok'})
})

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
