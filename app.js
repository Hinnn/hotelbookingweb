var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const bookings = require("./routes/bookings");
const rooms = require("./routes/rooms");
const customers = require("./routes/customers");
var app = express();
var cors = require('cors');

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("running at localhost:" + port);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Our BookingRoutes

app.get('/bookings', bookings.findAll);
app.get('/bookings/amount', bookings.findTotalAmount);
app.get('/bookings/:customerID', bookings.findOne);

app.put('/bookings/:customerID/amount', bookings.incrementAmount);

app.post('/bookings',bookings.addBooking);

app.delete('/bookings/:customerID', bookings.deleteBooking);

//operations on rooms
app.get('/rooms', rooms.findAll);
//app.get('/rooms/:amount', rooms.findTotalAmount);
app.get('/rooms/:roomNum', rooms.findOne);

app.put('/rooms/:roomNum/price', rooms.incrementPrice);


app.post('/rooms',rooms.addRoom);

app.delete('/rooms/:roomNum', rooms.deleteRoom);


//operations on customers
app.post('/customers',customers.signUp);

app.post('/customers/:email', customers.login);

app.get('/customers', customers.findAll);

app.get('/customers/:customerID', customers.findOne);

//app.post('/customers',customers.addCustomer);
app.put('/customers/:customerID', customers.Edit);

app.delete('/customers/:customerID', customers.deleteCustomer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
