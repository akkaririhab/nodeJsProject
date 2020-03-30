const Restaurant = require('./restaurant.model');

function load(req, res, next, id) {
    Restaurant.get(id)
    .then((restaurant) => {
      req.restaurant = restaurant; 
      return next();
    })
    .catch(e => next(e));
}
/*get Restaurant */ 
function get(req, res) {
  return res.json(req.restaurant);
}
 

 
function create(req, res, next) {
  const restaurant = new Restaurant({
   name:req.body.name,
   filial:req.body.filial,
  logo:req.body.logo,
  
  });
  restaurant.save()
    .then(savedRestaurant => res.json(savedRestaurant))
    .catch(e => next(e));
}
 // Update existing restaurant
 
function update(req, res, next) {
  const restaurant = req.restaurant;
  restaurant.name = req.body.name;
  restaurant.filial = req.body.filial;
  restaurant.logo = req.body.logo;
  
  restaurant.save()
    .then(savedRestaurant => res.json(savedRestaurant))
    .catch(e => next(e));
}
 // Get restaurant list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Restaurant.list({ limit, skip })
    .then(restaurants => res.json(restaurants))
    .catch(e => next(e));
}
 //Delete restaurant
function remove(req, res, next) {
  const restaurant = req.restaurant;
  restaurant.remove()
    .then(deletedRestaurant => res.json(deletedRestaurant))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
