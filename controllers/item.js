const createItem = (req, res) => {
  let db = req.app.get('db');
  let { name,
        description,
        condition,
        zipcode,
        usd_value,
        image1,
        image2,
        image3,
        image4 } = req.body;

  db.createItem([name, description, req.sub, condition, zipcode, image1, image2, image3, image4, Number(usd_value)])
  .then(item => res.status(201).send(item[0]))
  .catch(err => res.send(err))
}

const getItemById = (req, res) => {
  let db = req.app.get('db');
  db.items.findOne({id: req.params.id})
  .then(item => res.send(item))
}

const getItems = (req, res) => {
  let db = req.app.get('db');
  db.getItemsBySub([req.sub])
  .then(items => res.send(items))
}

const getAllItems = (req, res) => {
  let db = req.app.get('db');
  db.items.find()
  .then(items => res.send(items));
}

const updateItem = (req, res) => {
  let db = req.app.get('db');
  req.body.id = req.params.id
  delete req.body.user_id;
  db.items.update(req.body)
  .then(item => res.send(item))
}

const deleteItem = (req, res) => {
  let db = req.app.get('db');
  db.items.destroy({id: req.params.id})
  .then(items => res.send(items[0]))
  .catch(err => {
    console.log(err.message);
    res.send(err.message);
  })
}

const getFeaturedItems = (req, res) => {
  let db = req.app.get('db');
  db.getFeaturedItems()
  .then(items => res.send(items))
}

module.exports = {
  createItem,
  getItemById,
  getItems,
  getAllItems,
  updateItem,
  deleteItem,
  getFeaturedItems
}
