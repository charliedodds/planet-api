const createError = require('http-errors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000;

const mongoDB = process.env.DB_URL || 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(bodyParser.json());
app.use(cors({ allow: true }));

const indexRoutes = require('./routes/index');
const planetsRoutes = require('./routes/planets');

app.use('/', indexRoutes);
app.use('/planets', planetsRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({
    message: 'There was an error with your request',
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`express app listening on port ${port}`);
});
