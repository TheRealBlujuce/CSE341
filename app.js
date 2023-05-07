const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB database');
}).catch(err => {
  console.error(err);
});

// Import the contact controller
const contactController = require('./controllers/contact-controller');

// Add middleware for parsing request body as JSON
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Willem Marda');
});

// GET all contacts
app.get('/contacts', contactController.getAllContacts);

// GET contact by ID
app.get('/contacts/:id', contactController.getContactById);

// POST a new contact
app.get('/new-contact', contactController.createContact);

// PUT update a contact by ID
app.put('/update-contact/:id', contactController.updateContact);

// DELETE a contact by ID
app.delete('/delete-contact/:id', contactController.deleteContact);

// Listen on Port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
