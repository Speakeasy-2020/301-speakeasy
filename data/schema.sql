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
  eventID NUMBER
)

CREATE TABLE events (
  id PRIMARY KEY,
  title VARCHAR(64),
  date VARCHAR(64),
  location VARCHAR(128),
  description VARCHAR(255),
  cockatilList NUMBER
);

CREATE TABLE drinks (
  id PRIMARY KEY,
  title VARCHAR(64),
  cocktailID NUMBER,
  thumbnail TEXT,
  instructions TEXT,
  glass VARCHAR(32),
);

CREATE TABLE recipes (
  id PRIMARY KEY,
  coctailID NUMBER,
  ingredient VARCHAR(32),
  quantity VARCHAR(32)
);

CREATE TABLE eventsMenus (
  id PRIMARY KEY,
  eventsID NUMBER,
  cocktailID NUMBER,
  isChecked BOOLEAN,
  guestsID NUMBER,
  guestIsChecked BOOLEAN
);