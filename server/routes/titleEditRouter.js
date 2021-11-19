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


// PUT route
router.put('/:id', (req, res) => {
    console.log('req.params', req.params);
    const taskId = req.params.id;
    const newText = req.body.newText;

    console.log('req.body', req.body);
    const sqlText = `
      UPDATE "tasks"
        SET "title"=$1
        WHERE "id"=$2;
    `;
    const sqlValues = [
      newText,
      taskId
    ];
  
    pool.query(sqlText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
      })
  });
  

module.exports = router;