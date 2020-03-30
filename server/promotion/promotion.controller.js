const Promotion = require('./promotion.model');

function load(req, res, next, id) {
   Promotion.get(id)
    .then((promotion) => {
      req.promotion = promotion; 
      return next();
    })
    .catch(e => next(e));
}
/*get  */ 
function get(req, res) {
  return res.json(req.promotion);
}
 

 
function create(req, res, next) {
  const promotion = new Promotion({
   duration:req.body.duration,
   quantity:req.body.quantity,
  photo:req.body.photo,
  reduction:req.body.reduction,
 // products:req.body.products
  
  });
  promotion.save()
    .then(savedPromotion => res.json(savedPromotion))
    .catch(e => next(e));
}
 // Update existing 
 
function update(req, res, next) {
  const promotion = req.promotion;
  promotion.duration = req.body.duration;
  promotion.quantity = req.body.quantity;
  promotion.reduction = req.body.reduction;
  promotion.photo = req.body.photo;
 // promotion.products = req.body.products;

  
 promotion.save()
    .then(savedPromotion => res.json(savedPromotion))
    .catch(e => next(e));
}
 // Get restaurant list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Prommotion.list({ limit, skip })
    .then(promotions => res.json(promotions))
    .catch(e => next(e));
}
 //Delete restaurant
function remove(req, res, next) {
  const promotion = req.promotion;
  promotion.remove()
    .then(deletedPromotion => res.json(deletedPromotion))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
