/**
 * REST API Service
 *
 * Serve:
 *  - the REST JSON API at /api
 *  - the static files at /
 */

import express from "express"
import api from "./api"

import * as graphDb from "../persistence/db"
import * as fake from "../persistence/fake"
import getDbInstance, {configureDbService} from "../persistence"

configureDbService([graphDb, fake])

let app = express();

app.use("/", express.static('public'))
app.use("/", api)
app.use("/api", api)

var port = process.env.PORT || 3010;
app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
