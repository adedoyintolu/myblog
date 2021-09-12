require('dotenv').config()

const express = require('express')
const app = express()
const port = 8000
const { dbConnection, Categories, DataTypes } = require('./models')
const bodyParser = require('body-parser')


async function main() {
  app.get('/', (req, res) => {
    res.send('Tolulope')
    res.sendStatus(200);
  })

  try {
    await dbConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  Categories.sync()

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/categories', async function (req, res) {
    await Categories.create({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug,
    });
    console.log("-------------" + req);
    res.send('New category created')
    res.sendStatus(200);
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

main();


