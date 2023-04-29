const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

// Connect to Mongo...
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB database');
}).catch(err => {
    console.error(err);
});

// Route to Home
app.get('/', (req, res) => {
  res.send('Willem Marda')
})

//const contactsRouter = require('./routes/contacts');
const contactController = require('./controllers/contact-controller'); // Import the controller

//app.use('/contacts', contactsRouter);
app.get('/contacts', contactController.getAllContacts);
app.get('/contacts/:id', contactController.getContactById);

// Listen on Port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
