const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Command  Schema
 */
const CommandSchema = new mongoose.Schema({
 price: {
    type: String, 
  },
 token:{
    type:String
  },
 status:{
type:String,
default:"pending"
 },
 option:{
     type:String
 },
 /* ProductList: {
    type: Schema.ObjectId,
    ref: "product"
},
/*User: {type: mongoose.Schema.ObjectId, required: true , ref: 'User'}
*/
/*PromotionList: [{
    type: Schema.ObjectId,
    ref: "promotion"
}],*/
 createdAt: {
    type: Date,
    default: Date.now
  }

});


/**
 * Statics
 */
CommandSchema.statics = {
  /**
   * Get 
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((command) => {
        if (command) {
          return command;
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


module.exports = mongoose.model('Command', CommandSchema);
