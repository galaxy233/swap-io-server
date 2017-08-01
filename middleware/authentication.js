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
    res.status(403).end()
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

module.exports = {
  user
}
