const express = require('express'),
    exphbs = require('express-handlebars'),
    path = require('path'),
    controler = require('./routes/controler'),
    config = require('./config/config'),
    db = require('./config/database'),
    app = express();

// DB connection
db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser
app.use(express.urlencoded({ extended: false }));

// Main route
app.use('/', controler);
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

app.listen(config.PORT, () => console.log(`Sequelize app listen on port: ${config.PORT}`));