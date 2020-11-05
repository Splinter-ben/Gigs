const gigRouter = require('express').Router();
const { getGigs, addGig, searchGig } = require('../controller/gig.ctrl');

// Main route
gigRouter.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// GET go to add gigs page
gigRouter.get('/add', (req, res) => res.render('add'));

// POST a new Gig
gigRouter.route('/gigs/add').post(addGig);

// GET display all gigs
gigRouter.route('/gigs').get(getGigs);

// GET search for gigs
gigRouter.route('/gigs/search').get(searchGig);

module.exports = gigRouter;
