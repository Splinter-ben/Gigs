const Sequelize = require('sequelize'),
  db = require('../config/database');

const Gig = db.define('gig', {
  title: {
    type: Sequelize.STRING,
    required: true,
  },
  technologies: {
    type: Sequelize.STRING,
    required: true,
  },
  description: {
    type: Sequelize.STRING,
    required: true,
  },
  budget: {
    type: Sequelize.STRING,
  },
  contact_email: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = Gig;
