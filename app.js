const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());   


app.post('/', (req, res) => {
  // Access the data sent in the POST request body (if any)
  const requestData = req.body;

  // Create the JSON response
  const responseJson = {
    message: 'Data received successfully!',
    data: requestData
  };

  // Send the JSON response with a 200 OK status
  res.status(200).json(responseJson); 
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
