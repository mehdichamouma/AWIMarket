import express from "express"
import api from "./api"

let app = express();

app.use("/", express.static('public'))
app.use("/", api)
app.use("/api", api)

var port = process.env.PORT || 3010;
app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
