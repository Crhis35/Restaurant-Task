const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const compression = require('compression');
const AppError = require('./utils/appError');
const restaurantsRouter = require('./routes/restaurantRoutes');
const reservationsRouter = require('./routes/reservationRoutes');
const app = express();
// Global middleware
//Set secure http headers
app.use(helmet());
//Development login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Limit request from api
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});

app.use(cors());
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanatization against NoSQL query injection
app.use(mongoSanitize());

// Data sanatization against XSS
app.use(xss());

// Prevent parameter polution
app.use(
  hpp({
    whitelist: ['offset', 'limit'],
  })
);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/reservations', reservationsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`), 404);
});

app.use(globalErrorHandler);

//start server
module.exports = app;
