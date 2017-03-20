# AWIMarket

Another Way to Imagine the Market

![alt tag](https://raw.githubusercontent.com/Azar06/AWIMarket/master/screenshots/app.png)

## Technologies

- Backend: NodeJS/Express
- Frontend: VueJS
- Database: Neo4J (graph db)
- Unit Tests: Mocha
- Others: Heroku, Postman, Webpack Hot Reloading, Slack

We're using LocalStorage to store the cart content.
We're also using websocket (SocketIO) to have a live notification system.

## Database

A snapshot of our database (Neo4J):

![alt tag](https://raw.githubusercontent.com/Azar06/AWIMarket/master/screenshots/graph.png)

## Prerequisites

Node V6.x and NPM v3.x

## Run (development)

```
git clone https://github.com/Azar06/AWIMarket
cd AWIMarket
npm install
npm start
```

App now listen on http://localhost:3010
Open on navigator

Edit the client front:

```
npm install -g webpack
webpack -w
```

## Test

To run the tests:

```
npm install -g mocha
npm test
```

Endpoints can be test using Postamn chrome extension https://www.getpostman.com/ 
