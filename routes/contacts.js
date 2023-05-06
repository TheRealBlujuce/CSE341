const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');

router.get('/', contactController.getAllContacts);

router.get('/:id', contactController.getContactById);

// POST a new contact
app.post('/', contactController.createContact);

// PUT update a contact by ID
app.put('/:id', contactController.updateContact);

// DELETE a contact by ID
app.delete('/:id', contactController.deleteContact);
