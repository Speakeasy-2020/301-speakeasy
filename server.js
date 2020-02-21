'use strict'

const express = require('express');
const app = express();
const superagent = require('superagent');
require('dotenv');


app.get('*', (req, res) => { res.sendFile('index.html', { root: './public' }) })
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
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=daiquiri`;
  superagent.get(url)
    .then(data => {
      let drinkResults = data.body.drinks.map(obj => new Drinks(obj));
      console.log(drinkResults);
    });
}

function Drinks(info) {
  this.name = info.strDrink;
  this.glass = info.strGlass;
  this.instructions = info.strInstructions;
  this.ingredient1 = info.strIngredient1;
  this.ingredient2 = info.strIngredient2;
  this.ingredient3 = info.strIngredient3;
  this.ingredient4 = info.strIngredient4;
  this.ingredient5 = info.strIngredient5;
  this.ingredient6 = info.strIngredient6;
  this.ingredient7 = info.strIngredient7;
  this.ingredient8 = info.strIngredient8;
  this.ingredient9 = info.strIngredient9;
  this.ingredient10 = info.strIngredient10;

}

drinkRender();

startServer();
