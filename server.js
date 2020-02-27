'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Server endpoints

//app.get requests
app.get('/', homePage);
app.get('/event', eventRender);
app.get('/guestList', guestListRender);
app.get('/menuRender', savedDrinksRender);
app.get('/publicView', publicPage);
app.get('/weeWooPage', weeWooRender);

//app.post requests
app.post('/menuRender/search', drinkRender);
app.post('/drinksDatabase', drinksTableDB);
app.post('/event', storeUser);
app.post('/guestList', createEvent);
app.post('/guestInput', addGuest);


//app.delete requests
app.delete('/guests/:id', deleteGuest);
app.delete('/drink/:id', deleteDrink);

/////Home Page Functions
function homePage(req, res) {
  res.render('pages/index.ejs');
}

function storeUser (req, res) {
  let username = req.body.username;
  let SQL = `
  INSERT INTO users (userName)
  VALUES ($1)`;
  let values = [username];
  app.locals.activeUser = username;
  client.query(SQL, values)
    .then( () => {
      res.render('pages/main/event.ejs');
    })
    .catch(() => {
      weeWooRender(req, res);
    });
}

/////Event Menu Page Functions
function eventRender(req, res) {
  res.render('pages/main/event.ejs');
}

function createEvent (req, res) {
  let eventsOwner = app.locals.activeUser;
  let eventTitle = req.body.eventTitle;
  app.locals.activeEvent = eventTitle;
  let eventDate = new Date(req.body.eventDate);
  let eventTime = req.body.eventTime;
  let eventUnixTime = new Date(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate(), parseInt(eventTime[0] + eventTime[1]) + 16, parseInt(eventTime[3] + eventTime[4]), 0, 0).unixTime();
  let eventLocation = req.body.eventLocation;
  let eventDescription = req.body.eventDescription;
  let SQL = `
  INSERT INTO events (eventsOwner, title, date, location, description)
  VALUES ($1, $2, $3, $4, $5) RETURNING *
  `;
  let values = [eventsOwner, eventTitle, eventUnixTime, eventLocation, eventDescription];
  let SQLguest = `INSERT INTO guests (guestName, eventTitle, eventOwner, isChecked) VALUES ('${app.locals.activeUser}', '${app.locals.activeEvent}', '${app.locals.activeUser}', TRUE);`;
  client.query(SQLguest);
  return client.query(SQL, values)
    .then( () => {
      guestListRender(req, res);
    })
    .catch(() => {
      weeWooRender(req, res);
    });

}


/////Guest Page Functions
function addGuest (req, res) {
  let guestName = req.body.guestName;
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
      guestListRender(req, res);
    })
    .catch(() => {
      weeWooRender(req, res);
    });
}

function deleteGuest (req, res) {
  let SQL = 'DELETE FROM guests where id=$1';
  let values = [req.params.id];
  return client.query(SQL, values)
    .then((results) => {
      guestListRender(req, res);
    })
    .catch(() => {
      weeWooRender(req, res);
    });
}

function guestListRender(req, res) {
  let SQL = `SELECT * FROM guests WHERE eventOwner = $1 AND eventTitle = $2;`;
  let values = [app.locals.activeUser, app.locals.activeEvent];
  client.query(SQL, values)
    .then( (results) => {
      res.render('pages/main/guestList', { guests: results.rows});
    })
    .catch(() => {
      weeWooRender(req, res);
    });
}

/////Menu Render page functions
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
    .catch(() => {
      weeWooRender(req, res);
    });
}
function deleteGuest (req, res) {
  let SQL = 'DELETE FROM guests where id=$1';
  let values = [req.params.id];
  return client.query(SQL, values)
    .then((results) => {
      guestListRender(req, res);
    })
    .catch(() => {
      weeWooRender(req, res);
    });
}

function deleteDrink(req, res) {
  let SQL = `DELETE FROM drinks WHERE id = $1`;
  let values = [req.params.id];
  console.log(values);

  return client.query(SQL, values)
    .then((data) => {
      savedDrinksRender(req, res);
    })
    .catch(() => {
      weeWooRender(req, res);
    });
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
        });
    })
    .then(() => {
      savedDrinksRender(req, res);
    })
    .catch(() => {
      weeWooRender(req, res);
    });
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
    .catch(() => {
      weeWooRender(req, res);
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

/////Public Page Functions
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
          return client.query(menuSQL, values)
            .then(menu => {
              console.log(events.rows);
              return res.render('pages/main/publicView', {events: events.rows, guests: guests.rows, menu: menu.rows});
            });
        });
    })
    .catch(() => {
      weeWooRender(req, res);
    });
}

/////Error Page Function
function weeWooRender(req, res) {
  res.status(500).render('pages/errorPage');
}

// Convert to unix time
Date.prototype.unixTime = function(){return this.getTime() / 1000 | 0;};

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

client.connect()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`up on ${process.env.PORT}`));
  })
  .catch(() => console.log('port client issue'));
