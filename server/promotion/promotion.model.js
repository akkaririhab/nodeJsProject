const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 *  Schema
 */
const PromotionSchema = new mongoose.Schema({
 duration: {
    type: String, 
  },
 token:{
    type:String
  },
 
 /*Products: [{
        type: ProductSchema.ObjectId,
        ref: "Product"
    }],*/
 reduction:{
     type:String
 } , 
 quantity:{
     type:String
 },       
photo:{
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
PromotionSchema.statics = {
  /**
   * Get 
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((promotion) => {
        if (promotion) {
          return promotion;
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


module.exports = mongoose.model('Promotion', PromotionSchema);
