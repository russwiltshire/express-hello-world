const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// env var containing the secret we use to sign the authentication cookies
const secretKey = process.env.AUTH_SECRET || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors()); // Enables CORS for all routes



// example route that authenticates a token
function authenticateToken(req, res, next) {
  
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];   
 
  if (token == null) return res.sendStatus(401);   
  // If no token is provided
  
  jwt.verify(token, secretKey, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403); // If the token is invalid

    // Assuming your token payload has userId and username
    req.user = { 
      id: user.userId, 
      username: user.username 
    }; 
    
    next(); // Continue to the next middleware or route handler
  });
}


app.get('/api/auth/check-token', authenticateToken, (req, res) => {
  // Access user information from req.user (set by the middleware)
  res.json({ message: 'Protected data', user: req.user });
});




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
      // Generate the token using the secret key
      const payload = {
          userId: 123,
          username: 'john_doe'
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      // send the response
      res.status(200).json( { message: 'Login successful', token: token } );
  } else {
    res.status(401).json( { message: 'Invalid credentials' } );
  }

});





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
