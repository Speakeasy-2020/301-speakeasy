-- These seed data queries will be ordered as if the first user were using the page for the first time.

-- The first action will be to add the user. We'll use Ron Dunphy's stage name for this!
INSERT INTO users (userName) VALUES ('Rubiksron');

-- The next thing they'll do is to create an event. The cocktailList column is NULL for now, this will involve an update query later.
INSERT INTO events (title, date, location, description, cocktailList) VALUES ('Class party', 1583003647, 'Ada Lovelace Classroom, Codefellows, Seattle, WA', `What a great class, let's have a celebration for everybody!`, NULL);

-- Next, the user will create a list of drink to add. We'll pull three cocktails from the cocktaildb API, modeled after Kory's constructor function
-- INSERT INTO 