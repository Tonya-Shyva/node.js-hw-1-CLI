const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

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
    const newData = [...data, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), "utf-8");
    return newData;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newData = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), "utf-8");
    return newData;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
