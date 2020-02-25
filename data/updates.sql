-- There are a few cases in speakeasy where we'll need to make use of updates. Guests indicating they plan to be present, people committing to bring drinks, the user deciding they don't want to invite a guest after all.

-- Update: Remove a guest from an event without destroying data.
-- Use case: It was discussed on 2020 02 22 how we might go about building, rendering, and updating the guests list when in the 'Guest List' page. One possibility was this flow: submit guest name 'bob', render 'bob' to DOM with option to remove, INSERT 'bob' into table 'guests', if user clicks to remove 'bob' we UPDATE 'guests' to change the eventsID value in 'bob' row to NULL which severs connection between 'bob' and the active event.
-- This is important because it is needed to offer the user an option to remove a guest from their list after it's been added to the database.
-- table = guests
-- id = ???
UPDATE
  guests
SET
  eventsID = NULL
WHERE
  id = ???; -- This value is the VARIABLE!! When you render remove option to the DOM as a form item, you should be giving it this ID number as a value, it is the best way to be sure you are removing the right guest.


-- Update: Check or uncheck that a guest has indicated they will attend the event.
-- This could be important, if we're committing to using that feature. It would be implemented in the public view page.
-- table = guests
-- id = ???
UPDATE
  guests
SET
  isChecked = TRUE
WHERE
  id = ???; -- This value is the VARIABLE!! This should be a value added to the element in the DOM.


-- Update: Check or uncheck that a guest or user has agreed to bring a menu item.
-- This is important because this is one of the key features to the app, an indicator that somebody has agreed to bring an item.
-- table = eventsMenus
-- id = 8
UPDATE
  eventsMenus
SET
  isChecked = TRUE
WHERE
  id = 8; -- This value is the VARIALBE!! This should be a value added to the element in the DOM.

