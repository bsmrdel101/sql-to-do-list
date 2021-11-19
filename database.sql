-- weekend-to-do-app

CREATE TABLE tasks (
    "id" SERIAL PRIMARY KEY,
	"title" VARCHAR (50) NOT NULL,
    "description" VARCHAR (500),
    "status" VARCHAR (15)
);

INSERT INTO "tasks" 
	("title", "description", "status") 
VALUES 
	('Test Title', 'Filler text', 'Incomplete');


SELECT * FROM "tasks";