'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const methodOverride = require('method-override');

// app.get('*', (req, res) => { res.sendFile('index.html', { root: './public' }); });
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Server endpoints
app.get('/', homePage);
app.get('/event', eventRender);
app.get('/guestList', guestListRender);
app.get('/menuRender', savedDrinksRender);
app.post('/menuRender/search', drinkRender);
app.get('/publicView', publicPage);
app.post('/drinksDatabase', drinksTableDB);

app.post('/event', storeUser);
app.delete('/guests/:id', deleteGuest);
app.delete('/drink/:id', deleteDrink);


// Convert to unix time
Date.prototype.unixTime = function(){return this.getTime() / 1000 | 0;};

function storeUser (request, response) {
  let username = request.body.username;
  let SQL = `
  INSERT INTO users (userName)
  VALUES ($1)`;
  let values = [username];
  app.locals.activeUser = username;
  client.query(SQL, values)
    .then( () => {
      response.render('pages/main/event.ejs');
    })
    .catch(() => errorHandler('Error 500 ! Something has gone!', request, response));
}

app.post('/guestList', createEvent);

function createEvent (request, response) {
  let eventsOwner = app.locals.activeUser;
  let eventTitle = request.body.eventTitle;
  app.locals.activeEvent = eventTitle;
  let eventDate = new Date(request.body.eventDate);
  let leapModifier = Math.trunc((eventDate.getUTCFullYear() - 1968) / 4); // Might not need this.
  let eventTime = request.body.eventTime;
  let eventUnixTime = new Date(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate(), parseInt(eventTime[0] + eventTime[1]) + 16, parseInt(eventTime[3] + eventTime[4]), 0, 0).unixTime();
  let eventLocation = request.body.eventLocation;
  let eventDescription = request.body.eventDescription;
  let SQL = `
  INSERT INTO events (eventsOwner, title, date, location, description)
  VALUES ($1, $2, $3, $4, $5) RETURNING *
  `;
  let values = [eventsOwner, eventTitle, eventUnixTime, eventLocation, eventDescription];
  let SQLguest = `INSERT INTO guests (guestName, eventTitle, eventOwner, isChecked) VALUES ('${app.locals.activeUser}', '${app.locals.activeEvent}', '${app.locals.activeUser}', TRUE);`;
  client.query(SQLguest);
  return client.query(SQL, values)
    .then( (results) => {
      // response.render('pages/main/guestList.ejs');
      guestListRender(request, response);
    });
}

app.post('/guestInput', addGuest);

function addGuest (request, response) {
  let guestName = request.body.guestName;
  let eventTitle = app.locals.activeEvent;
  let eventsOwner = app.locals.activeUser;
  let isChecked = false;
  let SQL = `
  INSERT INTO guests (guestName, eventTitle, eventOwner, isChecked)
  VALUES ($1, $2, $3, $4) RETURNING *
  `;
  let values = [guestName, eventTitle, eventsOwner, isChecked];
  client.query(SQL, values)
    .then( (results) => {
      guestListRender(request, response);
      // console.log('guest val', results.rows);
      // response.redirect('/guestList');
    })
    .catch(err => console.log(err));
}

function deleteGuest (request, response) {
  let SQL = 'DELETE FROM guests where id=$1';
  let values = [request.params.id];
  return client.query(SQL, values)
    .then(() => {
      guestListRender(request, response);
    })
    .catch(err => console.log(err));
}

function savedDrinksRender(req, res) {
  let SQL = `SELECT DISTINCT
    a.drinkTitle AS a_drink,
    a.thumbnail AS a_img,
    a.instructions AS a_instructions
  FROM
    drinks a
  LEFT JOIN eventsMenus b ON a.cocktailID = b.cocktailID
  LEFT JOIN events c ON b.eventsID = c.title
  WHERE
    c.eventsOwner = $1
    AND c.title = $2
  ;`;
  let values = [app.locals.activeUser, app.locals.activeEvent];

  client.query(SQL, values)
    .then(data => {
      res.render('pages/main/menuRender.ejs', { databaseResults: data.rows, });
    })
    .catch(() => errorHandler('Error 500 ! Something has gone!', req, res));
}

function deleteDrink(req, res) {
  let SQL = `DELETE FROM drinks WHERE id = $1`;
  let values = [req.params.id];

  return client.query(SQL, values)
    .then(() => {
      savedDrinksRender(req, res);
    })
    .catch(() => errorHandler('Error 500 ! Something has gone!', req, res));
}

function homePage(req, res) {
  res.render('pages/index.ejs');
}

function eventRender(req, res) {
  res.render('pages/main/event.ejs');
}

function drinksTableDB (req, res) {
  let drinkID = req.body.drink_id;
  let name = req.body.drink_drinkTitle;
  let image = req.body.drink_image;
  let glass = req.body.drink_glass;
  let instructions = req.body.drink_instructions;

  let SQL = `INSERT INTO drinks (cocktailID, drinkTitle, thumbnail, instructions, glass) VALUES ($1, $2, $3, $4, $5);`;
  let SQL2 = `INSERT INTO eventsMenus (cocktailID, eventsID) VALUES ($1, $2);`;
  let values = [drinkID, name, image, instructions, glass];
  let values2 = [drinkID, app.locals.activeEvent];
  return client.query(SQL, values)
    .then(() => {
      return client.query(SQL2, values2)
        .then((data) => {
        })
    })
    .then(() => {
      savedDrinksRender(req, res);
    })
    .catch(() => errorHandler('Error 500 ! Something has gone!', req, res));
}

function guestListRender(req, res) {
  let SQL = `SELECT * FROM guests WHERE eventOwner = $1 AND eventTitle = $2;`;
  let values = [app.locals.activeUser, app.locals.activeEvent];
  client.query(SQL, values)
    .then( (results) => {
      res.render('pages/main/guestList', { guests: results.rows});
    });
}

function publicPage(req, res) {
  let eventSQL = `SELECT eventsOwner, title, to_timestamp(TRUNC(CAST(date AS bigint))) AT time zone 'utc' AS date, location, description FROM events WHERE eventsOwner = $1 AND title = $2;`;
  let guestsSQL = `SELECT * FROM guests WHERE eventOwner = $1 AND eventTitle = $2;`;
  let menuSQL = `SELECT DISTINCT
  a.drinkTitle AS a_drink,
  a.thumbnail AS a_img,
  a.instructions AS a_instructions
  FROM
  drinks a
  LEFT JOIN eventsMenus b ON a.cocktailID = b.cocktailID
  LEFT JOIN events c ON b.eventsID = c.title
  WHERE
  c.eventsOwner = $1
  AND c.title = $2
  ;`;
  let values = [app.locals.activeUser, app.locals.activeEvent];

  client.query(eventSQL, values)
    .then( events => {
      client.query(guestsSQL, values)
        .then(guests => {
          client.query(menuSQL, values)
            .then(menu => {
              console.log(events.rows);
              return res.render('pages/main/publicView', {events: events.rows, guests: guests.rows, menu: menu.rows})

            })
        })
      })

  // client.query(eventSQL, eventValues)
  //   .then( results => {
  //     return res.render('pages/main/publicView', {results: results.rows[0]});
  //   })
  //   .catch(err => console.log(err));
}

function drinkRender(req, res) {
  let drink = req.body.search;
  console.log(drink);
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
  console.log(url);
  superagent.get(url)
    .then(data => {
      // console.log(data);
      let drinkResults = data.body.drinks.map(obj => new Drinks(obj));
      res.render('pages/main/drinkSearch', {searchResults: drinkResults });
    })
    .catch(err => console.log(err));
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
// Still need errorPage.ejs

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

