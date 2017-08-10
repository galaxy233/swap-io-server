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
    const { zipcode, radius, sortby } = req.query;
    if (zipcode && radius) {
      results = results.filter(radiusFilter(zipcode, radius)).map(addDistance(zipcode))
    }
    switch (sortby) {
      case 'distance asc':
        results.sort((a,b) => a.distance-b.distance)
        break;
      case 'distance desc':
        results.sort((a,b) => b.distance-a.distance)
        break;
      case 'value asc':
        results.sort((a,b) => a.usd_value-b.usd_value)
        break;
      case 'value desc':
        results.sort((a,b) => b.usd_value-a.usd_value)
        break;
    }
    res.send(results);
  })
}

module.exports = {
  searchAll
}
