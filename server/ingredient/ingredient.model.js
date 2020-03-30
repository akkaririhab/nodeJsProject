const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 *  Schema
 */
const IngredientSchema = new mongoose.Schema({
 name: {
    type: String, 
  },
 token:{
    type:String
  },
 price:{
type:String,

 },

  description:{
      type: String
  },
 quantity:{
     type:String
 },
 createdAt: {
    type: Date,
    default: Date.now
  }

});


/**
 * Statics
 */
IngredientSchema.statics = {
  /**
   * Get 
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((ingredient) => {
        if (ingredient) {
          return ingredient;
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


module.exports = mongoose.model('Ingredient', IngredientSchema);
