const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const MessageSchema = new mongoose.Schema({
  name: {
    type: String
  },
  tel: {
    type: String
  },
  email: {
    type:String
  },
  subject:{
    type:String
  },
  textMessage:{
    type:String
  },
  token:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
MessageSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((message) => {
        if (message) {
          return message;
        }
        const err = new APIError('No such Project exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};
module.exports = mongoose.model('Message', MessageSchema);
