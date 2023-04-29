const Contact = require('../models/contact');

// Get all contacts
async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error getting contacts' });
  }
}

// Get a specific contact by ID
async function getContactById(req, res) {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id).exec();
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

module.exports.getAllContacts = getAllContacts;
module.exports.getContactById = getContactById;