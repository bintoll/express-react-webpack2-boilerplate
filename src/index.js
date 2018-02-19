import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import config from './constants/config.js'

import { initDatabase } from './api/Database.js'

import index from './routes/index.js'
import fetchPostsData from './routes/fetchPostsData.js'

const app = express();

initDatabase(() => {
	// app.listen(27017, () => {
	// 	console.log('listening on 3000')
	// })
})

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', index);

app.use('/api/fetchPostsData', fetchPostsData);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res) => {
// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
