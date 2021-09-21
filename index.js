require('dotenv').config()

const express = require('express')
const app = express()
const port = 8000
const { dbConnection } = require('./models')
const bodyParser = require('body-parser');
const { createCategory, getCategory } = require('./controllers/category');


async function main() {
  app.get('/', (req, res) => {
    res.send('My Blog')
    res.sendStatus(200);
  })

  try {
    await dbConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/categories', createCategory)

  app.get('/categories', getCategory)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

main();


