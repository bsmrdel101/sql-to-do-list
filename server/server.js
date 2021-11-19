const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/taskRouter');
const titleEditRouter = require('./routes/titleEditRouter');
const descEditRouter = require('./routes/descEditRouter');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/tasks', taskRouter);
app.use('/titleEdit', titleEditRouter);
app.use('/descEdit', descEditRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});