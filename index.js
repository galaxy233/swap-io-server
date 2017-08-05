const express = require('express');
const session = require('express-session')
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');

const userCtrl = require('./controllers/user');
const itemCtrl = require('./controllers/item');
const awsCtrl = require('./controllers/aws');
const searchCtrl = require('./controllers/search');

const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
const authMiddleware = require('./middleware/authentication')

app.get('/api/user', authMiddleware.user, userCtrl.getUserBySub);
app.post('/api/user', authMiddleware.user, userCtrl.createUser);

app.get('/api/items', authMiddleware.user, itemCtrl.getItems);
app.get('/api/items/all', itemCtrl.getAllItems);
app.get('/api/item/:id', itemCtrl.getItemById);
app.post('/api/item', authMiddleware.user, itemCtrl.createItem);
app.put('/api/item/:id', authMiddleware.user, authMiddleware.userOwnsItem, itemCtrl.updateItem);
app.delete('/api/item/:id', authMiddleware.user, authMiddleware.userOwnsItem, itemCtrl.deleteItem);

app.get('/api/search', searchCtrl.searchAll)

app.post('/api/aws/getsignedurl', authMiddleware.user, awsCtrl.getSignedURL);

massive({
  host: config.elephant.host,
  port: config.elephant.port,
  user: config.elephant.user,
  password: config.elephant.password,
  database: config.elephant.database
}).then(db => {
  db.initDb();
  app.set('db', db);
  app.listen(3000, () => {
    "Listening on port 3000";
  })
})
