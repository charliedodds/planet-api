const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ allow: true }));

const indexRoutes = require('./routes/index');
const planetsRoutes = require('./routes/planets');

app.use('/', indexRoutes);
app.use('/planets', planetsRoutes);

app.listen(port, () => {
  console.log(`express app listening on port ${port}`);
});
