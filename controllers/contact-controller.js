const Contact = require('../models/contact');

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts
 *     responses:
 *       200:
 *         description: A list of all contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */

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

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a specific contact using an ID
 *     description: Retrieve a specific contact using their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the contact to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         birthday:
 *           type: string
 *         favColor:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - birthday
 *         - favColor
 *
 * /new-contact:
 *   post:
 *     summary: Create a New Contact
 *     description: Create a new contact and add it to the db
 *     requestBody:
 *       description: The contact to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: A new Contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: A field is missing data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
// Create a new contact
async function createContact(req, res) {
  const { firstName, lastName, email, birthday, favColor } = req.body;

  if (!firstName || !lastName || !email || !birthday || !favColor) {
    return res.setHeader('Content-Type', 'application/json')
      .status(400)
      .json({ error: 'All fields are required' }, console.log('Missing a Field.'), console.log('Request Body', req.body));
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         birthday:
 *           type: string
 *         favColor:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - birthday
 *         - favColor
 *
 * /update-contact/{id}:
 *   put:
 *     summary: Update Contact
 *     description: updating a contact in the db
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of contact to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: the contact to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The contact has been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Failed to find contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
async function updateContact(req, res) {
  try {
    const id = req.params.id;
    const updatedContact = req.body;
    const result = await Contact.updateOne({ _id: id }, updatedContact);

    if (result.nModified > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(204);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).json({ message: 'Contact not found' }, console.log(id));
    }
  } catch (err) {
    console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error updating contact' });
  }
}

/**
 * @swagger
 * /delete-contact/{id}:
 *   delete:
 *     summary: Delete a Contact
 *     description: Delete a contact from the db
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the contact to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletes a contact from the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
// Delete a contact by ID
async function deleteContact(req, res) {
  try {
    const id = req.params.id;
    const result = await Contact.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(200);
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


