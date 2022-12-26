const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("node:path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin, // введення зі стандартного потоку
  output: process.stdout, // виведення у стандартний потік
});

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function writeContacts(list) {
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
}

async function listContacts() {
  const listRow = await fs.readFile(contactsPath);
  const list = JSON.parse(listRow);
  return list;
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find((contact) => {
    if (contact.id === contactId) {
      console.log(`Get contact by ID ${contactId}:`);
      console.table(contact);
      return contact;
    }
  });
  return contact;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const remove = list.filter((contact) => contact.id != contactId);
  await writeContacts(remove);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const list = await listContacts();
  list.push(contact);

  await writeContacts(list);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
