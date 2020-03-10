const Message = require('./message.model');

function load(req, res, next, id) {
  Message.get(id)
    .then((message) => {
      req.message = message; 
      return next();
    })
    .catch(e => next(e));
}
/*get Message */ 
function get(req, res) {
  return res.json(req.message);
}
 //Create new message
 
function create(req, res, next) {
  const message = new Message({
  name:req.body.name,
   tel:req.body.tel,
   email:req.body.email,
   subject:req.body.subject,
   textMessage:req.body.textMessage,
   createdAt:req.body.createdAt
  });
  message.save()
    .then(savedMessage => res.json(savedMessage))
    .catch(e => next(e));
}
 // Update existing Message
 
function update(req, res, next) {
  const message = req.message;
  /*tel:req.body.tel,
   email:req.body.email,
   subject:req.body.subject,
   textMessage:req.body.textMessage,
   createdAt*/
  message.name = req.body.name;
  message.tel= req.body.tel;
  message.email=req.body.email;
  message.subject=req.body.subject;
  message.textMessage=req.body.textMessage;
  message.createdAt=req.body.createdAt;

 
  message.save()
    .then(savedMessage => res.json(savedMessage))
    .catch(e => next(e));
}
 // Get Message list.

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Message.list({ limit, skip })
    .then(messages => res.json(messages))
    .catch(e => next(e));
}
 //Delete message
function remove(req, res, next) {
  const messages= req.message;
  message.remove()
    .then(deletedMessage => res.json(deletedMessage))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
