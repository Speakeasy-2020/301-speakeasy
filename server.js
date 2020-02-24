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
app.get('/menuRender', menuPage);
app.get('/publicView', publicPage);

app.post('/event', storeUser);

// Convert to unix time
Date.prototype.unixTime = function(){return this.getTime()/1000|0};

function storeUser (request, response) {
  let username = request.body.username;
  let SQL = `
  INSERT INTO users (userName)
  VALUES ($1)`;
  let values = [username];
  console.log(request.body.username);
  app.locals.activeUser = username;
  console.log(app.locals.activeUser);
  client.query(SQL, values)
    .then( () => {
      response.render('pages/main/event.ejs');
    });
}

app.post('/guestList', createEvent);

function createEvent (request, response) {
  let eventsOwner = app.locals.activeUser;
  let eventTitle = request.body.eventTitle;
  let eventDate = new Date(request.body.eventDate);
  let leapModifier = Math.trunc((eventDate.getUTCFullYear() - 1968) / 4); // Might not need this.
  let eventTime = request.body.eventTime;
  let eventUnixTime = new Date(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate(), parseInt(eventTime[0] + eventTime[1]) + 16, parseInt(eventTime[3] + eventTime[4]), 0, 0).unixTime();
  let eventLocation = request.body.eventLocation;
  let eventDescription = request.body.eventDescription;
  let SQL = `
  INSERT INTO events (eventsOwner, title, date, location, description)
  VALUES ($1, $2, $3, $4, $5)
  `;
  let values = [eventsOwner, eventTitle, eventUnixTime, eventLocation, eventDescription];
  client.query(SQL, values)
    .then( () => {
      console.log(values);
      response.render('pages/main/guestList.ejs');
    });
}

app.post('/menuRender', (req, res) => {
  res.render('pages/main/menuRender.ejs');
});

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
