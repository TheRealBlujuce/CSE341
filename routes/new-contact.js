const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');

router.post('/new-contact', contactController.createContact);
// POST a new contact
// app.post('/', contactController.createContact);

