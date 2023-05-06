const Contact = require('../models/contact');

// Get all contacts
async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error getting contacts' });
  }
}

// Get a specific contact by ID
async function getContactById(req, res) {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id).exec();
    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: err });
  }
}

// Create a new contact
async function createContact(req, res) {
  const { firstName, lastName, email, birthday, favColor } = req.body;

  if (!firstName || !lastName || !email || !birthday || !favColor) {
    return res.setHeader('Content-Type', 'application/json')
      .status(400)
      .json({ error: 'All fields are required' }, console.log('Missing a Field.'));
  }

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      birthday,
      favColor,
    });

    const savedContact = await newContact.save();

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ id: savedContact._id });
  } catch (err) {
    console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error creating contact' });
  }
}

// Update a contact by ID
// Update a contact by ID
async function updateContact(req, res) {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, birthday, favColor } = req.body;
    const updatedContact = { firstName, lastName, email, birthday, favColor };
    const result = await Contact.updateOne({ _id: id }, updatedContact);

    if (result.nModified > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(204);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error updating contact' });
  }
}



// Delete a contact by ID
async function deleteContact(req, res) {
  try {
    const id = req.params.id;
    const result = await Contact.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(204);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error deleting contact' });
  }
}

module.exports.getAllContacts = getAllContacts;
module.exports.getContactById = getContactById;
module.exports.createContact = createContact;
module.exports.updateContact = updateContact;
module.exports.deleteContact = deleteContact;