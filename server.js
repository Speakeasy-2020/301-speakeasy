'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
const pg = require('pg');


// app.get('*', (req, res) => { res.sendFile('index.html', { root: './public' }); });
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.set('view engine', 'ejs');

// Server endpoints
app.get('/', homePage);
app.get('/event', eventRender);
app.get('/guestList', guestListRender);
app.get('/menuRender', drinkRender);
app.get('/publicView', publicPage);

app.post('/event', (req, res) => {
  res.render('pages/main/event.ejs');
})


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
function drinkRender() {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=egg+nog`;
  superagent.get(url)
    .then(data => {
      let drinkResults = data.body.drinks.map(obj => new Drinks(obj));
      // console.log(drinkResults);
    });
}

function Drinks(info) {
  this.name = info.strDrink;
  this.glass = info.strGlass;
  this.image = info.strDrinkThumb;
  this.instructions = info.strInstructions;
  this.ingredient = [info.strIngredient1, info.strIngredient2, info.strIngredient3, info.strIngredient4, info.strIngredient5, info.strIngredient6, info.strIngredient7, info.strIngredient8, info.strIngredient9, info.strIngredient10, info.strIngredient11];
}
drinkRender();


app.get('*', (req, response) => response.status(404).send('This route does not exist'));

function startServer(){
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
}
startServer();
