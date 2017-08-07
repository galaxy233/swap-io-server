const getTrade = (req, res) => {
  res.send(req.trade)
}

const getTrades = (req, res) => {
  let db = req.app.get('db');
  db.trades.where('user1_sub = $1 OR user2_sub = $1',[req.sub])
  .then(trades => res.send(trades))
  .catch(err => res.status(400).send(err))
}

const createTrade = (req, res) => {
  let db = req.app.get('db');
  db.getItemSub([req.body.user1_item_id])
  .then(item1 => {
    if (item1[0].sub === req.sub) {
      db.getItemSub([req.body.user2_item_id])
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
