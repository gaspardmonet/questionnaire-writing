const Sequelize = require('sequelize');

exports.sequelize = new Sequelize(process.env.MYSQL_DATABASE_NAME, process.env.MYSQL_USERNAME, '', {
  host: process.env.MYSQL_HOSTNAME,
  dialect: 'mysql',
  timezone: '+08:00',
});