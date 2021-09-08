const express = require('express')
const { Sequelize } = require('sequelize');
const app = express()
const port = 6000
const sequelize = new Sequelize('mysql', 'root', 'password_root', {
  host: 'localhost',
  dialect: 'mysql'
});

async function main() {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

main();


