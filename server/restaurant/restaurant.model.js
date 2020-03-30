const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Restaurant  Schema
 */
const RestaurantSchema = new mongoose.Schema({
 name: {
    type: String, 
  },
 token:{
    type:String
  },
 filial:[{
    name:{type:String},
    address:{type:String},
    city:{type:String},
    MobileNumber:{type:Number},
   /* Menu: [{
        type: Schema.ObjectId,
        ref: "Product"
    }],*/
         }], 
logo:{
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
RestaurantSchema.statics = {
  /**
   * Get 
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((restaurant) => {
        if (restaurant) {
          return restaurant;
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


module.exports = mongoose.model('Restaurant', RestaurantSchema);
