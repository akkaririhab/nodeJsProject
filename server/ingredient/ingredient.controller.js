const Ingredient= require('./ingredient.model');

function load(req, res, next, id) {
    Ingredient.get(id)
    .then((ingredient) => {
      req.ingredient = ingredient; 
      return next();
    })
    .catch(e => next(e));
}
/*get */ 
function get(req, res) {
  return res.json(req.ingredient);
}
 

 
function create(req, res, next) {
  const ingredient = new Ingredient({
   name:req.body.name,
   price:req.body.price,
   quantity:req.body.quantity,
  description:req.bod.description,
  });
  ingredient.save()
    .then(savedIngredient => res.json(savedIngredient))
    .catch(e => next(e));
}
 // Update existing Product
 
function update(req, res, next) {
  const ingredient = req.ingredient;
  ingredient.name = req.body.name;
  ingredient.price = req.body.price;
  ingredient.quantity = req.body.quantity;
  ingredient.description = req.body.description;

  
  ingredient.save()
    .then(savedIngredient => res.json(savedIngredient))
    .catch(e => next(e));
}
 // Get Products list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Ingredient.list({ limit, skip })
    .then(ingredients => res.json(ingredients))
    .catch(e => next(e));
}
 //Delete product
function remove(req, res, next) {
  const ingredient = req.ingredient;
  ingredient.remove()
    .then(deletedIngredient => res.json(deletedIngredient))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
