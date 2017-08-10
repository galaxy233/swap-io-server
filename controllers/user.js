const getUserBySub = (req, res) => {
  let db = req.app.get('db');
  db.users.findOne({
    sub: req.sub
  })
  .then(user => {
    if (user) {
      res.send(user)
    } else {
      res.send({error : "User does not exist"})
    }
  })
  .catch(err => res.send(err.message))
}

const createUser = (req, res) => {
  let db = req.app.get('db');
  db.users.insert({
    username: req.body.username,
    zipcode: req.body.zipcode,
    sub: req.sub
  })
  .then(user => res.send(user))
  .catch(err => res.send(err.message))
}

const checkUsername = (req, res) => {
  let db = req.app.get('db');
  db.users.findOne({username:req.params.username})
  .then(user => {
    let usernameAvailable = user ? false : true
    res.send({usernameAvailable})
  })
}

module.exports = {
  getUserBySub,
  createUser,
  checkUsername
}
