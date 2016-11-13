/**
 * REST API Service
 *
 * Serve:
 *  - the REST JSON API at /api
 *  - the static files at /
 */

//ExpressJS
import express from "express"

//API endpoints
import api from "./api" //API Router

//DB Services
import * as graphDb from "../persistence/db"
import * as fake from "../persistence/fake"
import getDbInstance, {configureDbService} from "../persistence"

//Application config
import config from "../../config"

//Database configuration
graphDb.initDb(config.DB_URL)
configureDbService([graphDb, fake])

//REST API configuration
//
let app = express();

//Check all URI:
//if a corresponding file is found in /public directory, it will be served as static content
//Used for serving the index.html and assets (CSS, js, img)
app.use("/", express.static('public'))


//Let `api` handle all endpoints beginning by /api
app.use("/api", api)

//Start listening for HTTP Request
var port = config.PORT;
app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
