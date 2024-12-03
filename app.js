const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());   

app.use(cors()); // Enables CORS for all routes

app.post('/api/auth/signin', (req, res) => {
  
  // Access the data sent in the POST request body (if any)
  // Should be username and password.
  const requestData = req.body;

  // TODO: authentication logic ...
  const authenticated = true;

  // Send the JSON response
  if (authenticated) {
      // TODO: store username in session ...
      // send the response
      res.status(200).json( { message: 'Login successful' } );
  } else {
    res.status(401).json( { message: 'Invalid credentials' } );
  }

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
