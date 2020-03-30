const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * category  Schema
 */
const CategorySchema = new mongoose.Schema({
 name: {
    type: String, 
  },
 token:{
    type:String
  },
    items: [{
        type: Schema.ObjectId,
        ref: "Product"
    }],
          
logo:{
    type:String,
    default:null
  },
  description:{
    type:String,
    default:null
  },
 createdAt: {
    type: Date,
    default: Date.now
  }

});


/**
 * Statics
 */
CategorySchema.statics = {
  /**
   * Get 
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((category) => {
        if (category) {
          return category;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
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


module.exports = mongoose.model('Category', CategorySchema);
