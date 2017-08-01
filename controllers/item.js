const createItem = (req, res) => {
  let db = req.app.get('db');
  let { name,
        description,
        condition,
        zipcode,
        image_url } = req.body;

  db.createItem([name, description, req.sub, condition, zipcode, image_url ])
  .then(item => res.send({"message": "Item created successfully"}))
}

const getItems = (req, res) => {
  let db = req.app.get('db');
  db.getItemsBySub([req.sub])
  .then(items => res.send(items))
}

module.exports = {
  createItem,
  getItems
}
