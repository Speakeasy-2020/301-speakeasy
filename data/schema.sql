DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS eventsMenus;

CREATE TABLE users (
  id PRIMARY KEY,
  userName VARCHAR(32)
);

CREATE TABLE guests (
  id PRIMARY KEY,
  guestName VARCHAR(32),
  eventsID NUMBER,
  isChecked BOOLEAN
)

CREATE TABLE events (
  id PRIMARY KEY,
  eventsOwner VARCHAR(32),
  title VARCHAR(64),
  date VARCHAR(64),
  location VARCHAR(128),
  description VARCHAR(255),
  cocktailList NUMBER
);

CREATE TABLE drinks (
  id PRIMARY KEY,
  drinkTitle VARCHAR(64),
  cocktailID NUMBER,
  thumbnail TEXT,
  instructions TEXT,
  glass VARCHAR(32),
);

CREATE TABLE recipes (
  id PRIMARY KEY,
  cocktailID NUMBER,
  ingredient VARCHAR(32)
);

CREATE TABLE eventsMenus (
  id PRIMARY KEY,
  eventsID NUMBER,
  cocktailID NUMBER,
  isChecked BOOLEAN
);