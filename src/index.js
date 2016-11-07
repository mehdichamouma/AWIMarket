import express from "express"

var app = express();

app.get('/hello', function (req, res) {
  res.send('Hello Nassim!');
});

app.get('/hello/:name', (req, res) => {
  let {name} = req.params
  res.json({
    hello: name
  })
})

app.post('/hello', function(req, res) {
    res.send("fired with post")
})

app.listen(3010, function () {
  console.log('Example app listening on port 3000!');
});
