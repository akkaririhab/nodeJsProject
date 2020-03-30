const Command= require('./command.model');

function load(req, res, next, id) {
    Command.get(id)
    .then((command) => {
      req.command = command; 
      return next();
    })
    .catch(e => next(e));
}
/*get command*/ 
function get(req, res) {
  return res.json(req.command);
}
 

 
function create(req, res, next) {
  const command = new Command({
   status:req.body.status,
   price:req.body.price,
  option:req.body.option,
 // ProductList:req.body.ProductList,
  //PromotionList:req.body.PromotionList
  });
  command.save()
    .then(savedCommand => res.json(savedCommand))
    .catch(e => next(e));
}
 // Update existing Product
 
function update(req, res, next) {
  const command = req.command;
  command.status= req.body.status;
  command.price = req.body.price;
  command.option = req.body.option;
 // command.ProductList= req.body.ProductList;
//add promotion list
  
  command.save()
    .then(savedCommand => res.json(savedCommand))
    .catch(e => next(e));
}
 // Get  list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Command.list({ limit, skip })
    .then(commands => res.json(commands))
    .catch(e => next(e));
}
 //Delete 
function remove(req, res, next) {
  const command = req.command;
 command.remove()
    .then(deletedCommand => res.json(deletedCommand))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
