-- The next step the user will do is VIEW THINGS!!! This should populate the public view.

-- View: A specific cocktailID
-- cocktailID: 11016
SELECT
  drinkTitle AS drink,
  thumbnail AS imageURL,
  instructions,
  glass
FROM
  drinks
WHERE 
  cocktailID = 11016


-- View: All drinks AND their recipes from one event
-- This is important because it will be rendered on the public view page.
-- Tables: drinks, recipes, eventsMenus
-- eventsMenus.eventsID: 1



-- userID: 'Rubiksron', eventsID: 1