const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");
require("colors");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.filter(({ id }) => id === contactId);
    if (!contact) {
      console.log(`Contact with id=${contactId} doesn't exist`.red);
      return null;
    }
    return contact;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uid(12),
      name,
      email,
      phone,
    };
    if (
      [...contacts].find(
        ({ name, email, phone }) =>
          name.toLowerCase() === newContact.name.toLowerCase() ||
          email === newContact.email ||
          phone === newContact.phone
      )
    ) {
      return console.log("This contact already exist".yellow);
    }
    const updatedData = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(updatedData));
    return newContact;
  } catch (err) {
    return console.log(`Error: ${err.message}`.red);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const index = data.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      console.log(`Contact with id=${contactId} doesn't exist`.red);
      return null;
    }
    const updatedData = data.filter((_, i) => i !== index);
    fs.writeFile(contactsPath, JSON.stringify(updatedData));
    return data[index];
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
