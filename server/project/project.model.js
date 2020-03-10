const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  photoProject: {
    type:String
  },
  cost:{
    type:String
  },
  offers:[{
      price:{type: String },
      description:{type:String},
      purchaseNumber:{type:Number}
  }],
  owner:[{
      name:{type:String},
      country:{type:String},
      city:{type:String},
      MobileNumber:{type:Number},
      association:{type:String}
  }],

  status:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
ProjectSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((project) => {
        if (project) {
          return project;
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
module.exports = mongoose.model('Project', ProjectSchema);
