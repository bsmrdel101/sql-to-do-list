const express = require('express');
const router = express.Router();

// Connecting to the database
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost'
  });

pool.on('connect', () => {
    console.log('Postgresql connected');
  });
  
  pool.on('error', (error) => {
    console.log('Error with postgres pool', error)
  });


// GET route
router.get('/', (req, res) => {
  const sqlText = 'SELECT * FROM tasks;'
  pool.query(sqlText)
    .then((dbRes) => {
      const taskFromDb = dbRes.rows;
      res.send(taskFromDb);
    }).catch((dbErr) => {
      console.error(dbErr);
    });
});

// POST route
router.post('/', (req, res) => {
    const newTask = req.body;
    const sqlText = (`
    INSERT INTO "tasks"
    ("title", "description", "status")
    VALUES
      ($1, $2, $3);
  `)
  const sqlValues = [
    newTask.title,
    newTask.description,
    'Incomplete'
  ]
  console.log('SQL:', sqlText)
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error(dbErr);
    })
});

// PUT route, to update status


// DELETE route, to remove task

module.exports = router;