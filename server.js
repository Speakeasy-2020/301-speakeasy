'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

// app.get('*', (req, res) => { res.sendFile('index.html', { root: './public' }); });
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.set('view engine', 'ejs');

// Server endpoints
app.get('/', homePage);
app.get('/event', eventRender);
app.get('/guestList', guestListRender);
app.get('/menuRender', savedDatabase);
app.get('/publicView', publicPage);
// app.get('/savedDrink', savedDatabase);

app.post('/event', storeUser);

function storeUser (request, response) {
  let username = request.body.username;
  let SQL = `
  INSERT INTO users (userName)
  VALUES ($1)`;
  let values = [username];
  console.log(request.body.username);
  // app.locals.activeUser = request;
  client.query(SQL, values)
    .then( () => {
      response.render('pages/main/event.ejs');
    })
    .catch(() => errorHandler('Error 500 ! Something has gone!', request, response));
}

app.post('/guestList', (req, res) => {
  res.render('pages/main/guestList.ejs');
});

app.post('/menuRender', (req, res) => {
  res.render('pages/main/menuRender.ejs');
});

function savedDatabase(req, res) {
  let SQL = `SELECT * FROM drinks`;

  client.query(SQL)
    .then(data => {
      console.log(data);
      res.render('pages/main/menuRender.ejs', { databaseResults: data.rows, });
    })
    .catch(() => errorHandler('Error 500 ! Something has gone!', req, res));
}

function homePage(req, res) {
  res.render('pages/index.ejs');
}

function eventRender(req, res) {
  res.render('pages/main/event.ejs');
}

function guestListRender(req, res) {
  res.render('pages/main/guestList');
}

function publicPage(req, res) {
  res.render('pages/main/publicView');
}

function menuPage(req, res) {
  res.render('pages/main/menuRender');
}


function drinkRender(req, res) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=egg+nog`;
  
  superagent.get(url)
    .then(data => {
      let drinkResults = data.body.drinks.map(obj => new Drinks(obj));
      res.render('pages/main/menuRender', {searchResults: drinkResults, });
    });
}

function Drinks(info) {
  this.id = info.idDrink;
  this.name = info.strDrink;
  this.glass = info.strGlass;
  this.image = info.strDrinkThumb;
  this.instructions = info.strInstructions;
  this.ingredient = [info.strIngredient1, info.strIngredient2, info.strIngredient3, info.strIngredient4, info.strIngredient5, info.strIngredient6, info.strIngredient7, info.strIngredient8, info.strIngredient9, info.strIngredient10, info.strIngredient11];
}

app.get('*', (req, response) => response.status(404).send('This route does not exist'));

function errorHandler(error, req, response) {
  response.status(500).send(error);
}

// function startServer(){
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
// }
// startServer();

client.connect()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`up on ${process.env.PORT}`));
  })
  .catch(() => console.log('port client issue'));
