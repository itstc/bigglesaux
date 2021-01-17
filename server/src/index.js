const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./queries');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.json({message: 'server running'});
});

app.get('/items', db.getItems);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

