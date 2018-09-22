const express = require('express');

const bodyParser = require('body-parser');

/**
 * Get all routes here
 */
const indexRoutes = require('./routes/index');

const app = express();

app.use(bodyParser.json({
  limit: '8mb'
})); // support json encoded bodies

app.use(bodyParser.urlencoded({
  limit: '8mb',
  extended: true
})); // support encoded bodies

/**
 * Set all routes here, orders are important
 */
app.use('/', indexRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  console.error('ERROR: ', err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
