// Package imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var file = require('file-system');
require('dotenv').config();

// SendGrid setup
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Connect MySQL Database
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

function startConnection() {
  console.log('CONNECTING');
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  connection.connect(function(err) {
    if (err) {
      console.error('CONNECT FAILED', err.code);
      startConnection();
    }
    else {
      console.log('CONNECTED');
    }
  });
  connection.on('error', function(err) {
    if (err.fatal) {
      startConnection();
    }
  });
}

startConnection();

var app = express();
// var consultation = require('./routes/consultation/consultation');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/consultation', consultation);

// Port Number
var port = process.env.PORT || 3000;

// CORS Mioddleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'dist')));

// Consultation form email
// app.route('/consultation').post((req, res) => {
//   const leadFirstName = req.body.consultFirstName;
//   const leadLastName = req.body.consultLastName;
//   const leadEmailAddress = req.body.consultEmailAddress;
//   const leadOrgName = req.body.consultOrgName;

//   var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };

//   const consultationDBEntry = {
//     firstName: leadFirstName,
//     lastName: leadLastName,
//     emailAddress: leadEmailAddress,
//     orgName: leadOrgName,
//     date: CURRENT_TIMESTAMP
//   };

//   const msg = {
//     to: ['ethan@aqueduct.ai', 'jeff@aqueduct.ai'],
//     // to: 'ethan@kasuriagroup.com',
//     from: 'info@aqueduct.ai',
//     subject: 'Aqueduct Consultation Submission',
//     html: `<p>The following individual just submitted a consultation form on Aqueduct.ai:</p><p><ul><li>First Name: ${leadFirstName}</li><li>Last Name: ${leadLastName}</li><li>Email Address: ${leadEmailAddress}</li><li>Org Name: ${leadOrgName}</li></ul></p><p>Follow up with them ASAP!</p>`
//   };

//   return sgMail.send(msg)

//     .then(() => connection.query('INSERT INTO consultations SET ?', consultationDBEntry, function (error, results) {
//       if (error) throw error;
//       if (results) {
//         console.log('results of database entry are: ' + results);
//       }
//     }))
//     .then(() => res.status(200).json({
//       message: 'email sent!'
//     }))
//     .catch(() => res.status(400).send(err))

// });

// Blog Subscription 
app.route('/subscribe').post(function (req, res) {

  var appData = {
    "error": 1,
    "data": ""
  };

  var userData = {
    emailAddress: req.body.emailAddress
  };

  connection.query('INSERT INTO blog_subscribers SET ?', userData, function (err) {
    if (!err) {
      appData.error = 0;
      appData["data"] = "Subscription successful!";
      res.status(201).json(appData);
    } else {
      console.log(err);
      appData["data"] = "Error Occured!";
      res.status(400).json(appData);
    }
  });
});

// Index Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});