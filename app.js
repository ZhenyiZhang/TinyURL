const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


/*set up*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*import environment variables */
require('dotenv').config({path: './process.env'});

/*mongodb config*/
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.log('An error occurs when connecting to Mongodb :' + err);
    });

/* Connect to database */
const DB = mongoose.connection;
DB.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*import routes*/
const indexRoute = require('./routes/index');
const tinyRoute = require('./routes/tiny');

const apiBase = '/api';
/* set up routes */
app.use('', indexRoute);
app.use(apiBase + '/tiny', tinyRoute);

/*set the backend server URL*/
const port = process.env.PORT || PORT;

/*listen on port*/
app.listen(port, () => console.log('server started on port ' + PORT));