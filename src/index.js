const express = require('express');
const sequelize = require('./config/database.js');
const { auth } = require('express-openid-connect');
// const User = require('./models/User.js');

require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT || 3000;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_CLIENT_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH_ClIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER,
};

app.use(auth(config));
app.use(express.json());

sequelize.sync()
  .then(async () => {
    console.log("Database has been synced!");
  })
  .catch((error) => {
    console.error("Error during database sync:", error);
  });

app.get('/profile', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.send(JSON.stringify(req.oidc.user));
  }
});

// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
