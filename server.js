'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');


const pg = require('pg');

app.get('*', (req, res) => { res.sendFile('index.html', { root: './public' }); });
// does nothing without app.listen
// app.listen(3000)
//   .then(console.log('alive on 3000'))
//   .catch(console.log('uh og'))
function startServer(){
  const port = process.env.PORT || 3000;
  app.listen(port)
    // .then(() => console.log(`Server Listening on ${port}`))
    // .catch(err => console.error(err));
}



function drinkRender() {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=egg+nog`;
  superagent.get(url)
    .then(data => {
      let drinkResults = data.body.drinks.map(obj => new Drinks(obj));
      console.log(drinkResults);
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

  app.listen(port);
  // .then(() => console.log(`Server Listening on ${port}`))
  // .catch(err => console.error(err));
}

function navBar() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
//app.set('view engine', 'ejs');

startServer();
