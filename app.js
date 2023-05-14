const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB database');
}).catch(err => {
  console.error(err);
});

// create the options for the swagger ui
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for My API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'https://my-api.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            birthday: { type: 'string'},
            favColor: { type: 'string' }
          },
          required: ['firstName', 'lastName', 'email', 'birthday', 'favColor']
        }
      }
    },
    basePath: '/'
  },
  apis: ['controllers/contact-controller.js'],
};

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
app.post('/new-contact', contactController.createContact);

// PUT update a contact by ID
app.put('/update-contact/:id', contactController.updateContact);

// DELETE a contact by ID
app.delete('/delete-contact/:id', contactController.deleteContact);

// Route for Swagger Doc
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Listen on Port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
