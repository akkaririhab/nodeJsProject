const Project = require('./project.model');

function load(req, res, next, id) {
  Project.get(id)
    .then((project) => {
      req.project = project; 
      return next();
    })
    .catch(e => next(e));
}
/*get project */ 
function get(req, res) {
  return res.json(req.project);
}
 //Create new Project
 
function create(req, res, next) {
  const project = new Project({
   title:req.body.title,
   description:req.body.description,
   photoProject:req.body.photoProject,
   cost:req.body.cost,
   offers:req.body.offers,
   owner:req.body.owner,
   status:req.body.status
  });
  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}
 // Update existing project
 
function update(req, res, next) {
  const project = req.project;
  project.title = req.body.title;
  project.description = req.body.description;
  project.photoProject=req.body.photoProject;
  project.cost=req.body.cost;
  project.offers=req.body.offers;
  project.owner=req.body.owner;
  project.status=req.body.status;
  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}
 // Get Project list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Project.list({ limit, skip })
    .then(projects => res.json(projects))
    .catch(e => next(e));
}
 //Delete project
function remove(req, res, next) {
  const project = req.project;
  project.remove()
    .then(deletedProject => res.json(deletedProject))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
