const getTrade = (req, res) => {
  let db = req.app.get('db');
  let adder = addTradeInfo(req.sub,db)
  adder(req.trade)
  .then(trade => res.send(trade))
}

const addTradeInfo = (sub, db) => {
  return (trade) => {
    let user_init = trade.user1_sub === sub
    let trading, receiving, user_complete, other_user_complete
    if (user_init) {
      trading = trade.user1_item_id
      receiving = trade.user2_item_id
      user_complete = trade.user1_complete
      other_user_complete = trade.user2_complete
    } else {
      trading = trade.user2_item_id
      receiving = trade.user1_item_id
      user_complete = trade.user2_complete
      other_user_complete = trade.user1_complete
    }

    return db.getItemInfo([receiving])
    .then(result => {
      return {
        id: trade.id,
        status: trade.status,
        other_username: result[0].username,
        user_init,
        trading,
        receiving,
        receiving_name: result[0].name,
        user_complete,
        other_user_complete
      }
    })
  }
}

const getTrades = (req, res) => {
  let db = req.app.get('db');
  db.trades.where('user1_sub = $1 OR user2_sub = $1',[req.sub])
  .then(trades => {
    Promise.all(trades.map(addTradeInfo(req.sub, db)))
    .then(values => res.send(values))
  })
  .catch(err => res.status(400).send(err.message))
}

const createTrade = (req, res) => {
  let db = req.app.get('db');
  db.getItemInfo([req.body.user1_item_id])
  .then(item1 => {
    if (item1[0].sub === req.sub) {
      db.getItemInfo([req.body.user2_item_id])
      .then(item2 => {
        req.body.user1_sub = item1[0].sub
        req.body.user2_sub = item2[0].sub
        db.trades.insert(req.body)
        .then(trade => res.send(trade))
      })
    } else {
      res.send({"error": "You can only trade items in your inventory."})
    }
  })
  .catch(err => res.status(400).send(err))
}

const acceptTrade = (req, res) => {
  let db = req.app.get('db');
  db.trades.update(
    {
      id: req.params.trade_id,
      status: 'accepted'
    }
  ).then(trade => res.send(trade))
  .catch(err => res.status(400).send(err))
}

const cancelTrade = (req, res) => {
  let db = req.app.get('db');
  db.trades.update(
    {
      id: req.params.trade_id,
      status: 'cancelled'
    }
  ).then(trade => res.send(trade))
  .catch(err => res.status(400).send(err))
}

const completeTrade = (req, res) => {
  let db = req.app.get('db');
  let data = {id:req.trade.id}
  if (req.trade.user1_sub === req.sub) {
    data.user1_complete = true
  } else {
    data.user2_complete = true
  }
  db.trades.update(data)
  .then(trade => res.send(trade))
  .catch(err => res.status(400).send(err))
}

module.exports = {
  getTrade,
  getTrades,
  createTrade,
  acceptTrade,
  cancelTrade,
  completeTrade
}
