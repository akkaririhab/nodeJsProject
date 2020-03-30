const Product= require('./product.model');

function load(req, res, next, id) {
    Product.get(id)
    .then((product) => {
      req.product = product; 
      return next();
    })
    .catch(e => next(e));
}
/*get Product */ 
function get(req, res) {
  return res.json(req.product);
}
 

 
function create(req, res, next) {
  const product = new Product({
   name:req.body.name,
   price:req.body.price,
  photo:req.body.photo,
  description:req.bod.description,
  });
  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}
 // Update existing Product
 
function update(req, res, next) {
  const product = req.product;
  product.name = req.body.name;
  product.price = req.body.price;
  product.photo = req.body.photo;
  product.description = req.body.description;

  
  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}
 // Get Products list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then(products => res.json(products))
    .catch(e => next(e));
}
 //Delete product
function remove(req, res, next) {
  const product = req.product;
 product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
