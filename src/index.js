const express = require('express');
const sequelize = require('./config/database.js');
const User = require('./models/User.js');
require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

sequelize.sync()
  .then(async () => {
    console.log("Database has been synced!");
  })
  .catch((error) => {
    console.error("Error during database sync:", error);
  });

app.get('/', (req, res) => {
  console.log(process.env.APP_PORT);
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
