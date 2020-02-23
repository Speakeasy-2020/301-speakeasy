-- These seed data queries will be ordered as if the first user were using the page for the first time.

-- The first action will be to add the user. We'll use Ron Dunphy's stage name for this!
INSERT INTO users (userName) VALUES ('Rubiksron');
-- Going forward, we need to hold onto a value here. Probably best to hold onto userName (Rubiksron), as that's completely unique, and that will be set in our app.local variables

-- The next thing they'll do is to create an event. The cocktailList column is NULL for now, this will involve an update query later.
INSERT INTO events (title, eventsOwner, date, location, description) VALUES ('Class party', 'Rubiksron', 1583003647, 'Ada Lovelace Classroom, Codefellows, Seattle, WA', 'What a great class, we should have a celebration for everybody!');
-- Like the userName, we'll need to hold onto the event name in app.local as well.

-- Next, the user will create a list of drinks to add. We'll pull three cocktails from the cocktaildb API, modeled after Kory's constructor function
INSERT INTO drinks (drinkTitle, cocktailID, thumbnail, instructions, glass) VALUES ('Grizzly Bear', 12762, 'https://www.thecocktaildb.com/images/media/drink/k6v97f1487602550.jpg', 'Served over ice. Sounds nasty, but tastes great.', 'Collins Glass');
INSERT INTO drinks (drinkTitle, cocktailID, thumbnail, instructions, glass) VALUES ('Brandy Alexander', 11016, 'https://www.thecocktaildb.com/images/media/drink/tvqxvr1483387746.jpg', 'Shake all ingredients (except nutmeg) with ice and strain contents into a cocktail glass. Sprinkle nutmeg on top and serve.', 'Cocktail Glass');
INSERT INTO drinks (drinkTitle, cocktailID, thumbnail, instructions, glass) VALUES ('Daiquiri', 11006, 'https://www.thecocktaildb.com/images/media/drink/usuuur1439906797.jpg', 'Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.', 'Cocktail Glass');
-- This next query adds these drinks to the eventsMenus table, and it needs a few things. We'll need the cocktailID's from all the cocktails that were inserted into table:drinks, and we'll need the userName and events title that we stored in app.local.
INSERT INTO eventsMenus (eventsID, cocktailID, isChecked) VALUES (1, 12762, FALSE);
INSERT INTO eventsMenus (eventsID, cocktailID, isChecked) VALUES (1, 11016, FALSE);
INSERT INTO eventsMenus (eventsID, cocktailID, isChecked) VALUES (1, 11006, FALSE);
-- The next several queries add all the ingredients from the three cocktails to the recipes table. All ingredients in recipes will be unique, they cannot be reused as they have a volume/quantity parameter specific to a cocktailID.
INSERT INTO recipes (cocktailID, ingredient) VALUES (12762, 'Amaretto');
INSERT INTO recipes (cocktailID, ingredient) VALUES (12762, 'Jägermeister');
INSERT INTO recipes (cocktailID, ingredient) VALUES (12762, 'Kahlua');
INSERT INTO recipes (cocktailID, ingredient) VALUES (12762, 'Milk');
INSERT INTO recipes (cocktailID, ingredient) VALUES (11016, 'Brandy');
INSERT INTO recipes (cocktailID, ingredient) VALUES (11016, 'Creme de Cacao');
INSERT INTO recipes (cocktailID, ingredient) VALUES (11016, 'Light cream');
INSERT INTO recipes (cocktailID, ingredient) VALUES (11016, 'Nutmeg');
INSERT INTO recipes (cocktailID, ingredient) VALUES (11006, 'Light rum');
INSERT INTO recipes (cocktailID, ingredient) VALUES (11006, 'Lime');
INSERT INTO recipes (cocktailID, ingredient) VALUES (11006, 'Powdered sugar');

-- Next, the user will build a guest list. We need to call from app.local our eventsID.
INSERT INTO guests (guestName, eventsID, isChecked) VALUES ('Dan', 1, FALSE);
INSERT INTO guests (guestName, eventsID, isChecked) VALUES ('Kai', 1, FALSE);
INSERT INTO guests (guestName, eventsID, isChecked) VALUES ('Thomas', 1, FALSE);
INSERT INTO guests (guestName, eventsID, isChecked) VALUES ('Kory', 1, FALSE);
INSERT INTO guests (guestName, eventsID, isChecked) VALUES ('Brett', 1, FALSE);

-- Next step is viewing data. That can be found in selects.sql
