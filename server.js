/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoUri = exports.mongoUri = process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/test';

var users = exports.users = ['1417526761868371', '112199445534552', '141801682544988', '1449728135277608', '138162499562220'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _morgan = __webpack_require__(13);

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = __webpack_require__(10);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(9);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _Database = __webpack_require__(6);

var _index = __webpack_require__(8);

var _index2 = _interopRequireDefault(_index);

var _fetchPostsData = __webpack_require__(7);

var _fetchPostsData2 = _interopRequireDefault(_fetchPostsData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _Database.initDatabase)(function () {
	// app.listen(27017, () => {
	// 	console.log('listening on 3000')
	// })
});

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static('public'));

app.use('/', _index2.default);

app.use('/api/fetchPostsData', _fetchPostsData2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// #!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = __webpack_require__(2);
var debug = __webpack_require__(3)('sapronovkd:server');
var http = __webpack_require__(4);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDatabase = exports.db = undefined;

var _config = __webpack_require__(1);

var MongoClient = __webpack_require__(12).MongoClient;

var db = exports.db = void 0;

var initDatabase = exports.initDatabase = function initDatabase(callback) {
  MongoClient.connect(_config.mongoUri, function (err, client) {
    if (err) return console.log(err);
    exports.db = db = client.db('facebookDataFetch');

    // db.collection('posts').find().toArray(function(err, results) {
    //   console.log(results)
    //   // send HTML file populated with quotes here
    // })

    callback();
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _fb = __webpack_require__(11);

var _fb2 = _interopRequireDefault(_fb);

var _Database = __webpack_require__(6);

var _config = __webpack_require__(1);

var _dns = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

__webpack_require__(14);

var router = _express2.default.Router();
_fb2.default.options({ timeout: 10000, accessToken: 'EAACEdEose0cBAE0Tx3bBQHr26wG1y2fqxjRHJBPW1YYyvnDJygPZAcLLoTXVXIpyNyjU1bkZAuIpKMaPamcBIGjx6EL1SrrWZCKugggiBvXfZAFJAxZBnQF6MA6EahN34F6OIB0YVs6JK8qiuAjrN3anBkEPX1vPbcMDWv7Wr4DsZCZAksEZB4ZB6Mu72KipmeJGToOuL0Hq9GQZDZD' });

/* GET users listing. */
router.get('/', function (req, res) {
    var _this = this;

    var sinceTimestamp = String(Date.now() - 86400 * 10000000).slice(0, -3);

    if (_config.users) return Promise.all(_config.users.map(function (user) {
        return new Promise(function (resolve, reject) {
            _fb2.default.api(user + '/feed', { fields: ['comments.limit(1).summary(true)', 'likes.limit(1).summary(true)', 'created_time'], limit: '10', since: sinceTimestamp }, function (data) {
                if (!data || data.error) {
                    console.log(!data ? 'error occurred' : res.error);
                    return;
                }
                console.log(data);

                if (data && data.data) {
                    _Database.db.collection('posts').insertMany(data.data.map(function (dataItem) {
                        return _extends({}, dataItem, { _id: dataItem.id });
                    })).then(function (data) {
                        console.log('saved');
                        return resolve(data);
                    }).catch(function (error) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                    });
                }
            });
        });
    })).then(function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
            var allPosts;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _Database.db.collection('posts').find().toArray();

                        case 2:
                            allPosts = _context.sent;

                            res.json({ status: 'success', data: allPosts });

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }()).catch(function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(error) {
            var allPosts;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (error) console.log(error);
                            _context2.next = 3;
                            return _Database.db.collection('posts').find().toArray();

                        case 3:
                            allPosts = _context2.sent;

                            res.json({ status: 'success', data: allPosts });

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }());
});

module.exports = router;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

exports.default = router;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fb");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("dns");

/***/ })
/******/ ]);