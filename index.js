const express = require('express');
const session = require('express-session')
const massive = require('massive');

const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const authMiddleware = require('./middleware/authorization');
const cors = require('cors');

const userCtrl = require('./controllers/user');
const itemCtrl = require('./controllers/item');
const awsCtrl = require('./controllers/aws');
const searchCtrl = require('./controllers/search');
const tradeCtrl = require('./controllers/trade');

const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

if (process.env.NODE_ENV === 'development') {
  console.log("Warning: CORS is enabled on ALL requests.");
  app.use(cors())
}

app.get('/api/user', authMiddleware.user, userCtrl.getUserBySub);
app.post('/api/user', authMiddleware.user, userCtrl.createUser);
app.get('/api/user/:username', userCtrl.checkUsername);
app.get('/api/getzipcode', userCtrl.getZipcodeByCoords);

app.get('/api/items', authMiddleware.user, itemCtrl.getItems);
app.get('/api/items/all', itemCtrl.getAllItems);
app.get('/api/items/featured', itemCtrl.getFeaturedItems);
app.get('/api/item/:id', itemCtrl.getItemById);
app.post('/api/item', authMiddleware.user, itemCtrl.createItem);
app.put('/api/item/:id', authMiddleware.user, authMiddleware.userOwnsItem, itemCtrl.updateItem);
app.delete('/api/item/:id', authMiddleware.user, authMiddleware.userOwnsItem, itemCtrl.deleteItem);

app.get('/api/search', searchCtrl.searchAll);

app.get('/api/trade/:trade_id', authMiddleware.user, authMiddleware.userInTrade, tradeCtrl.getTrade);
app.get('/api/trades/', authMiddleware.user, tradeCtrl.getTrades);
app.post('/api/trade', authMiddleware.user, tradeCtrl.createTrade);
app.put('/api/trade/accept/:trade_id', authMiddleware.user, authMiddleware.userCanAcceptTrade, tradeCtrl.acceptTrade);
app.put('/api/trade/cancel/:trade_id', authMiddleware.user, authMiddleware.userInTrade, tradeCtrl.cancelTrade);
app.put('/api/trade/complete/:trade_id', authMiddleware.user, authMiddleware.userInTrade, tradeCtrl.userComplete, tradeCtrl.completeTrade);

app.post('/api/aws/getsignedurl', authMiddleware.user, awsCtrl.getSignedURL);

app.use(fallback('index.html', { root: __dirname + '/public' }));

massive({
  host: config.elephant.host,
  port: config.elephant.port,
  user: config.elephant.user,
  password: config.elephant.password,
  database: config.elephant.database
}).then(db => {
  app.set('db', db);
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  })
});
