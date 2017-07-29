const express = require('express');
const session = require('express-session')
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');

const userCtrl = require('./controllers/user');

const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
const authMiddleware = require('./middleware/authentication')

app.get('/api/user', authMiddleware.user, userCtrl.getUserBySub);
app.post('/api/user', authMiddleware.user, userCtrl.createUser);

massive({
  host: config.elephant.host,
  port: config.elephant.port,
  user: config.elephant.user,
  password: config.elephant.password,
  database: config.elephant.database
}).then(db => {
  app.set('db', db)
  app.listen(3000, () => {
    "Listening on port 3000";
  })
})
