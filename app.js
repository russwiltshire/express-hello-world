const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = process.env.PORT || 3000;

// env var containing the secret we use to sign the authentication cookies
const authSecret = process.env.AUTH_SECRET || 3000;

// TURNS OUT THIS IN-MEMORY SESSION IS NO GOOD - DOESN'T WORK PAST A SINGLE PROCESS!
// configure the session
app.use(session({
      secret: authSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
      secure: true,
      maxAge: 30 * 60 * 1000
    }
}));

// Middleware to parse JSON request bodies
app.use(express.json());   

app.use(cors()); // Enables CORS for all routes

// example route that does authentication and signs in
app.post('/api/auth/signin', (req, res) => {
  
  // Access the data sent in the POST request body (if any)
  // Should be username and password.
  const requestData = req.body;

  // Simulate user authentication (replace with your actual logic)
  const user = { id: 123, username: 'bobross' };
  const authenticated = true;
  
  // Send the JSON response
  if (authenticated) {
      // Store user data in the session
      req.session.user = user;
      const sessionId = req.sessionID;
      // send the response
      res.status(200).json( { message: 'Login successful', sessionId } );
  } else {
    res.status(401).json( { message: 'Invalid credentials' } );
  }

});


// Example route that accesses session data
app.get('/api/auth/getsession', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}!`);
  } else {
    res.send('You need to log in first.');
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
