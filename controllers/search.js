const zipcodes = require('zipcodes');

const radiusFilter = (zipcode, radius) => {
  return (item) => {
    let withinRadius = zipcodes.radius(zipcode, radius);
    return withinRadius.indexOf(item.zipcode) !== -1;
  }
}

const addDistance = (zipcode) => {
  return (item) => {
    item.distance = zipcodes.distance(zipcode, item.zipcode)
    return item
  }
}

const searchAll = (req, res) => {
  let db = req.app.get('db');
  let keywords = req.query.keywords.replace(/\s/g, '|');
  let regex = `.*(${keywords}).*`;
  db.searchAll([regex])
  .then(results => {
    let { zipcode, radius } = req.query;
    if (zipcode && radius) {
      res.send(results.filter(radiusFilter(zipcode, radius)).map(addDistance(zipcode)))
    } else {
      res.send(results)
    }
  })
}

module.exports = {
  searchAll
}
