const router = require('express').Router();
Gig = require('../models/Gig'),
    Sequelize = require('sequelize'),
    Op = Sequelize.Op;

// Display gigs
router.get('/gigs', (req, res) => {
    Gig.findAll()
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err));
});

// Add Form gigs
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/gigs/add', (req, res) => {
    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    // Validate fields
    if (!title || !technologies || !description || !contact_email) {
        errors.push({ text: 'Please fill all the fields' });
    }

    // Check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });
    } else {
        if (!budget) {
            budget = 'Unknown'
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
            contact_email
        })
            .then(gigs => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }
});

// Sarch for gigs
router.get('/gigs/search', (req, res) => {
    let { term } = req.query;
    term = term.toLowerCase();

    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err))
});

module.exports = router;