const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');

// DELETE a contact by ID
app.delete('/:id', contactController.deleteContact);
