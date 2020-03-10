const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ApplicationSchema = new mongoose.Schema({
    title: {
      type: String
    },
    description: {
        type: String
      },
    cost: {
        type: String
      },
      name: {
        type: String
      },
      country: {
        type: String
      },
      city: {
        type: String
      },
      mobileNumber: {
        type: String
      }
    })
    ApplicationSchema.statics = {
        get(id) {
          return this.findById(id)
            .exec()
            .then((application) => {
              if (application) {
                return application;
              }
              const err = new APIError('No such Application exists!', httpStatus.NOT_FOUND);
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
      module.exports = mongoose.model('Application',ApplicationSchema);
      