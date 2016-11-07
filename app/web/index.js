import express from "express"
import api from "./api"

let app = express();

app.use("/", express.static('public'))
app.use("/api", api)

app.listen(3010, function () {
  console.log('Example app listening on port 3000!');
});
