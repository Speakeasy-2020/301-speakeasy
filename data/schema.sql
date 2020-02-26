DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS eventsMenus;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(32)
);

CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  guestName VARCHAR(32),
  eventTitle VARCHAR(64),
  eventOwner VARCHAR(32),
  isChecked BOOLEAN
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  eventsOwner VARCHAR(32),
  title VARCHAR(64),
  date VARCHAR(64),
  location VARCHAR(128),
  description VARCHAR(255)
);

CREATE TABLE drinks (
  id SERIAL PRIMARY KEY,
  drinkTitle VARCHAR(64),
  cocktailID INTEGER,
  thumbnail TEXT,
  instructions TEXT,
  glass VARCHAR(32),
  ingredient VARCHAR(32)

);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  cocktailID INTEGER,
  ingredient VARCHAR(32)
);

CREATE TABLE eventsMenus (
  id SERIAL PRIMARY KEY,
  eventsID INTEGER,
  cocktailID INTEGER,
  isChecked BOOLEAN
);
