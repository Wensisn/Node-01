const {
  listContacts,
  removeContact,
  addContact,
  getContactById,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <list>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      console.log(`Get contact ${id}`);
      await getContactById(id);
      break;

    case "add":
      console.log(`Add contact ${name}, ${email}, ${phone} `);
      await addContact(name, email, phone);
      break;

    case "remove":
      console.log(`Remove contact ${id}`);
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
