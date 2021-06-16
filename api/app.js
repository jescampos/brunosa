var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var studentModel = require("./models/student.model");


//basicAuth
var auth = require('basic-auth')
const basicAuth = function (req, result) {
	var user = auth(req);
	if (user === undefined)
		return false;
	
	const student = {
        student_number: user.name,
        authentication_code: user.pass
    };

    // Verify data
	var signIn_err;
	var signIn_data;
    studentModel.signIn(student, (err, data) => {
		result(err, data);
		
        /*if(err == null)
		{
			console.log('aqui');
			console.log(user.name);
			return user.name;
		}
		else
			return -1;
		*/
		/*if (err) {
			console.log('error');
			return false;
        }
        else {
			if(data){
				console.log('aqui 2');
				return data;
			}
			else {
				
				console.log(data);
				console.log('aqui');
				return false;
			}
        }*/
    });
	/*console.log(signIn_err);
	console.log(signIn_data);
	console.log('signIn_data');
	if(signIn_err == null)
		{
			console.log('aqui');
			console.log(user.name);
			return user.name;
		}
		else
			return -1;
	*/
	
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import Route files
var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');
var agendaRouter = require('./routes/agenda');
app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/agenda', agendaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
exports.basicAuth = basicAuth;
