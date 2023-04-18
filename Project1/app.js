const express = require('express')
const app = express()

// Route to Home
app.get('/', (req, res) => {
  res.send('Willem Marda')
})

// Listen on Port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})