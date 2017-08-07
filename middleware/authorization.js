var jwkToPem = require('jwk-to-pem');
var jwt = require('jsonwebtoken');
var jwks = require('../jwks.json');

var pem = jwkToPem(jwks.keys[0]);

var options = {
  algorithms: ["RS256"],
  audience: "http://swap.io/api/",
  issuer: "https://swapio.auth0.com/",
  ignoreExpiration: false
};

const user = (req, res, next) => {
  let auth = req.get("Authorization")
  if (!auth) {
    res.status(403).send({"error": "You must provide a valid JWT"});
    return
  }
  let token = req.get("Authorization").split(' ')[1];
  jwt.verify(token, pem, options, (err, decoded) => {
    if (err) {
      res.status(403).send(err)
    } else {
      req.sub = decoded.sub;
      next();
    }
  })
}

const userOwnsItem = (req, res, next) => {
  let db = req.app.get('db');
  db.getItemSub([req.params.id])
  .then(result => {
    if (result[0].sub !== req.sub) {
      res.status(403).send({"error":"You are not authorized."})
    } else {
      next()
    }
  })
}

const userCanAcceptTrade = (req, res, next) => {
  let db = req.app.get('db');
  db.trades.findOne({id:req.params.trade_id})
  .then(trade => {
    if (trade.user2_sub === req.sub && trade.status === 'pending') {
      next()
    } else {
      res.status(403).send({"error": "You do not have access to accept this trade."})
    }
  })
  .catch(err => res.status(400).send(err))
}

const cancelTrade = (req, res) => {
  let db = req.app.get('db');
  db.trades.findOne({id: req.params.trade_id})
  .then(trade => {
    db.getSubsByItems([trade.user1_item_id, trade.user2_item_id])
    .then(subs => {
      if (subs[0].sub === req.sub || subs[1].sub === req.sub) {

      } else {

      }
    })
  })
  .catch(err => res.status(400).send(err))
}

const userInTrade = (req, res, next) => {
  let db = req.app.get('db');
  db.trades.findOne({id: req.params.trade_id})
  .then(trade => {
    if (trade.user1_sub === req.sub || trade.user2_sub === req.sub) {
      req.trade = trade
      next()
    } else {
      res.status(403).send({"error": "You do not have access to this trade."})
    }
  })
  .catch(err => res.status(400).send(err))
}

module.exports = {
  user,
  userOwnsItem,
  userCanAcceptTrade,
  userInTrade
}
