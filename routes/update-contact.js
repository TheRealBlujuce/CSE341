const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');


// PUT update a contact by ID
app.put('/:id', contactController.updateContact);


