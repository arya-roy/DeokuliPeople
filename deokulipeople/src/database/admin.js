import { getDatabase, initializeDatabase } from '../database/db.js';
import { loadPeopleDataFromDB, updatePerson, addPerson, deletePerson } from '../database/queries.js';

// Command line interface for database operations
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  try {
    await initializeDatabase();

    switch (command) {
      case 'list':
        await listPeople(args[1] || 'en');
        break;
      case 'add':
        await addPersonCmd(args.slice(1));
        break;
      case 'update':
        await updatePersonCmd(args.slice(1));
        break;
      case 'delete':
        await deletePersonCmd(args[1], args[2] || 'en');
        break;
      case 'stats':
        await showStats();
        break;
      default:
        showHelp();
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

async function listPeople(locale) {
  const people = await loadPeopleDataFromDB(locale);
  console.log(`People in ${locale}:`);
  console.table(people.slice(0, 10)); // Show first 10
  console.log(`Total: ${people.length} people`);
}

async function addPersonCmd(args) {
  if (args.length < 3) {
    console.log('Usage: npm run db-admin add <personId> <name> <fathersName> [locale]');
    return;
  }

  const [personId, name, fathersName, locale = 'en'] = args;
  await addPerson({
    PersonID: personId,
    Name: name,
    "Father's Name": fathersName,
    locale
  });

  console.log(`Added person: ${name} (${personId})`);
}

async function updatePersonCmd(args) {
  if (args.length < 4) {
    console.log('Usage: npm run db-admin update <personId> <field> <value> [locale]');
    return;
  }

  const [personId, field, value, locale = 'en'] = args;
  await updatePerson(personId, locale, { [field]: value });

  console.log(`Updated ${personId}: ${field} = ${value}`);
}

async function deletePersonCmd(personId, locale) {
  if (!personId) {
    console.log('Usage: npm run db-admin delete <personId> [locale]');
    return;
  }

  await deletePerson(personId, locale);
  console.log(`Deleted person: ${personId}`);
}

async function showStats() {
  const db = await getDatabase();

  const peopleCount = await db.get('SELECT COUNT(*) as count FROM people');
  const groupsCount = await db.get('SELECT COUNT(*) as count FROM groups');

  console.log('Database Statistics:');
  console.log(`- People records: ${peopleCount.count}`);
  console.log(`- Group records: ${groupsCount.count}`);

  const localeStats = await db.all(`
    SELECT locale, COUNT(*) as count
    FROM people
    GROUP BY locale
  `);

  console.log('People by locale:');
  localeStats.forEach(stat => {
    console.log(`- ${stat.locale}: ${stat.count}`);
  });
}

function showHelp() {
  console.log(`
Database Admin Tool

Usage: npm run db-admin <command> [args]

Commands:
  list [locale]           - List people (default: en)
  add <id> <name> <father> [locale] - Add new person
  update <id> <field> <value> [locale] - Update person field
  delete <id> [locale]    - Delete person
  stats                   - Show database statistics

Examples:
  npm run db-admin list hi
  npm run db-admin add N100 "John Doe" "Jane Doe"
  npm run db-admin update N1 Name "Updated Name"
  npm run db-admin delete N100
  npm run db-admin stats
  `);
}

main();