const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Product Schema
 */
const ProductSchema = new mongoose.Schema({
 name: {
    type: String, 
  },
 token:{
    type:String
  },
 price:{
type:String,

 },
photo:{
    type:String,
    default:null
  },
  description:{
      type: String
  },
 /* ingredient: [{
    type: Schema.ObjectId,
    ref: "ingredient"
}],*/
 createdAt: {
    type: Date,
    default: Date.now
  }

});


/**
 * Statics
 */
ProductSchema.statics = {
  /**
   * Get 
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) {
          return product;
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


module.exports = mongoose.model('Product', ProductSchema);
