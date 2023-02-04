const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");
require("colors");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    return data.filter(({ id }) => id === contactId);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await listContacts();
    const newContact = {
      id: uid(12),
      name,
      email,
      phone,
    };
    if (
      [...data].find(
        ({ name, email, phone }) =>
          name.toLowerCase() === newContact.name.toLowerCase() ||
          email === newContact.email ||
          phone === newContact.phone
      )
    ) {
      return console.log("This contact already exist".yellow);
    }
    const newData = [...data, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), "utf-8");
    return newData;
  } catch (err) {
    return console.log(`Error: ${err.message}`.red);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newData = data.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), "utf-8");
    return newData;
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
