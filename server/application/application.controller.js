const Application = require('./application.model');

function load(req, res, next, id) {
  Application.get(id)
    .then((application) => {
      req.application = application; 
      return next();
    })
    .catch(e => next(e));
}
//get Message 
function get(req, res) {
  return res.json(req.application);
}
 //Create new message
 
function create(req, res, next) {
  const application = new Application({
  title:req.body.title,
  description:req.body.description,
  cost:req.body.cost,
  name:req.body.name,
  country:req.body.country,
  city:req.body.city,
  mobileNumber:req.body.mobileNumber
  });
  application.save()
    .then(savedApplication => res.json(savedApplication))
    .catch(e => next(e));
}
 // Update existing Message
 
function update(req, res, next) {
  const application = req.application;
 
  application.title= req.body.title;
  application.description= req.body.description;
  application.cost=req.body.cost;
  application.name=req.body.name;
  application.country=req.body.country;
  application.city=req.body.city;
  application.mobileNumber=req.body.mobileNumber;

 
  application.save()
    .then(savedApplication => res.json(savedApplication))
    .catch(e => next(e));
}
 // Get Message list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Application.list({ limit, skip })
    .then(application => res.json(application))
    .catch(e => next(e));
}
 //Delete 
function remove(req, res, next) {
  const application= req.application;
  application.remove()
    .then(deletedApplication => res.json(deletedApplication))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
