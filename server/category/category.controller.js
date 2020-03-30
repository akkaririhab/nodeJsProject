const Category = require('./category.model');

function load(req, res, next, id) {
    Category.get(id)
    .then((category) => {
      req.category = category; 
      return next();
    })
    .catch(e => next(e));
}
/*get category */ 
function get(req, res) {
  return res.json(req.category);
}
 //add products 
   /* items: [{
        type: Schema.ObjectId,
        ref: "Product"
    }],*/
 

 
function create(req, res, next) {
  const category = new Category({
   name:req.body.name,
   description:req.body.description,
  logo:req.body.logo,
  
  });
  category.save()
    .then(savedCategory => res.json(savedCategory))
    .catch(e => next(e));
}
 // Update existing category
 
function update(req, res, next) {
  const category= req.category;
  category.name = req.body.name;
  category.description= req.body.description;
  category.logo = req.body.logo;
  
  category.save()
    .then(savedCategory => res.json(savedCategory))
    .catch(e => next(e));
}
 // Get category list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Category.list({ limit, skip })
    .then(category => res.json(category))
    .catch(e => next(e));
}
 //Delete category
function remove(req, res, next) {
  const category = req.category;
  category.remove()
    .then(deletedCategory => res.json(deletedCategory))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
