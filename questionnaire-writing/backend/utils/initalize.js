const Feedback = require('../model/FeedbackModel');
const Admin = require('../model/AdminModel');
const { sequelize } = require("../connection");

exports.initializeModels = () => {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database.', error);
    }
  })();
  Feedback.sync();
  Admin.sync();
}