-- The next step the user will do is VIEW THINGS!!! This should populate the public view.

-- View: All drinks and their recipes from one event
-- This is important because it will be rendered on the public view page.
-- Note, there are many more SELECTs in this query than are needed. Modify to fit the needs.
-- a. = eventsMenus
-- b. = drinks
-- c. = recipes
-- eventsMenus.eventsID = 2
SELECT DISTINCT
  a.id AS a_id, -- a.id is column(id) from table(eventsMenus)
  b.id AS b_id, -- b.id is column(id) from table(drinks)
  c.id AS c_id, -- b.id is column(id) from table(recipes)
  a.cocktailID AS a_cid, -- a.cocktailID is column(cocktailID) from table(eventsMenus)
  b.cocktailID AS b_cid, -- b.cocktailID is column(cocktailID) from table(drinks)
  c.cocktailID AS c_cid, -- c.cocktailID is column(cocktailID) from table(recipes)
  a.eventsID AS a_eid, -- a.eventsID is column(eventsID) from table(eventsMenus)
  b.drinkTitle AS b_drink, -- b.drinkTitle is column(drinkTitle) from table(drinks)
  c.ingredient AS c_ing -- c.ingredient is column(ingredient) from table(recipes)
FROM
  eventsMenus a
LEFT JOIN drinks b ON a.cocktailID = b.cocktailID
LEFT JOIN recipes c ON a.cocktailID = c.cocktailID
WHERE
  a.eventsID = 2; -- This value is THE VARIABLE!! Use app.locals.activeEvent for this value when you build this query.


-- View: All guests for a given event
-- This is important because guest names will be rendered on the public view page.
-- table = guests
-- eventsID = 2
SELECT -- VERY VERY IMPORTANT!!! If the column 'id' is not included in your SELECT statement (included in '*'), then DO NOT use the DISTINCT modifier. You will OMIT any guests that look like duplicates!
  * -- In this case, * includes id, guestName, eventsID, isChecked. Obviously, you could specify which columns you want if you don't want all.
FROM
  guests
WHERE
  eventsID = 2; -- This value is THE VARIABLE!! Use app.locals.activeEvent for this value when you build this query.


-- View: Complete event copy for a given event.
-- This is important because we need to render details about the event itself on the public view page.
-- table = events
-- id = 2
SELECT
  * -- Available columns are id, eventsOwner, title, date (epoch time), location, and description.
FROM
  events
WHERE
  id = 2 -- This value is THE VARIABLE!! Use app.locals.activeEvent for this value when you build this query.
  AND eventsOwner = 'John Cokos'; -- This value is not needed! I've only included it to show that it can be used. This variable can be found at app.locals.activeUser (if set). But it should not be used alone, an events id is needed, as there may be multiple events under a user.


-- 






-- userID: 'Rubiksron', eventsID: 1