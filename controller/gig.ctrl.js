const Gig = require('../models/Gig');
const Sequelize = require('sequelize'),
  Op = Sequelize.Op;

// @desc    DISPLAY aff gigs
// @route   GET /gigs
// @access  Public
exports.getGigs = (req, res) => {
  Gig.findAll()
    .then((gigs) => res.render('gigs', { gigs }))
    .catch((err) => console.log(err));
};

// @desc    DISPLAY aff gigs
// @route   GET /gigs
// @access  Public
exports.addGig = (req, res) => {
  const { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate fields
  if (!title || !technologies || !description || !contact_email) {
    errors.push({ text: `Please fill all the fields` });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    })
      .then((gigs) => res.redirect('/gigs'))
      .catch((err) => console.log(err));
  }
};

// @desc    SEARCH for gigs
// @route   POST /gigs/search
// @access  Public
exports.searchGig = (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then((gigs) => res.render('gigs', { gigs }))
    .catch((err) => console.log(err));
};
