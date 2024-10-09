const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'data.json';

// Helper function to read data
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { categories: [], contacts: [] };
  }
}

// Helper function to write data
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all categories and contacts
app.get('/api/data', async (req, res) => {
  const data = await readData();
  res.json(data);
});

// Add a new category
app.post('/api/categories', async (req, res) => {
  const data = await readData();
  const newCategory = req.body;
  data.categories.push(newCategory);
  await writeData(data);
  res.json(newCategory);
});

// Delete a category
app.delete('/api/categories/:id', async (req, res) => {
  const data = await readData();
  data.categories = data.categories.filter(category => category.id !== req.params.id);
  data.contacts = data.contacts.filter(contact => contact.category !== req.params.id);
  await writeData(data);
  res.json({ message: 'Category deleted' });
});

// Add a new contact
app.post('/api/contacts', async (req, res) => {
  const data = await readData();
  const newContact = req.body;
  data.contacts.push(newContact);
  await writeData(data);
  res.json(newContact);
});

// Update a contact
app.put('/api/contacts/:id', async (req, res) => {
  const data = await readData();
  const updatedContact = req.body;
  data.contacts = data.contacts.map(contact => 
    contact.id === parseInt(req.params.id) ? updatedContact : contact
  );
  await writeData(data);
  res.json(updatedContact);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});