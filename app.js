require('colors');

const express = require('express'),
  exphbs = require('express-handlebars'),
  path = require('path'),
  gigRouter = require('./routes/gig.route'),
  db = require('./config/database'),
  app = express();

// Body parser
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Main route
app.use('/', gigRouter);

// DB connection
db.authenticate()
  .then(() =>
    console.log(`Connection has been established successfully.`.green)
  )
  .catch((err) =>
    console.error(`Unable to connect to the database:`.magenta, err)
  );

// Server
const server = app.listen(PORT, () =>
  console.log(
    `Server sequelize running in ${process.env.NODE_ENV} mode, on port: ${PORT}`
      .yellow.bold
  )
);
