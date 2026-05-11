import { getDatabase, initializeDatabase } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Locale configurations
const LOCALES = {
  en: 'Deokuli_A_All.json',
  hi: 'DeokuliAneriyeAll_hi.json',
  mai: 'DeokuliAneriyeAll_hi.json', // Using hi file for mai as per current setup
  kaithi: 'DeokuliAneriyeAll_hi.json', // Using hi file for kaithi as per current setup
};

const GROUP_SUMMARY_FILE = 'DeokuliGroupSummary_en.json';

async function migratePeopleData() {
  console.log('Starting people data migration...');

  const db = await getDatabase();

  for (const [locale, filename] of Object.entries(LOCALES)) {
    console.log(`Migrating ${locale} data...`);

    const filePath = path.join(__dirname, `../i18n/locales/${locale}/${filename}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const person of data) {
      // Skip empty records
      if (!person.PersonID && !person.Name) continue;

      await db.run(`
        INSERT OR REPLACE INTO people (
          person_id, parent_id, locale, name, fathers_name, mothers_name,
          mothers_village, alive, marriage_village, alias_name,
          first_wife, second_wife, comment
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        person.PersonID,
        person.ParentID,
        locale,
        person.Name,
        person["Father's Name"],
        person["Mother's Name"],
        person["Mother's Village"],
        person.Alive,
        person["Marriage village"],
        person["Alias Name"],
        person["1st wife"],
        person["2nd Wife"],
        person.Comment
      ]);
    }

    console.log(`Migrated ${data.length} records for ${locale}`);
  }

  console.log('People data migration completed');
}

async function migrateGroupData() {
  console.log('Starting group data migration...');

  const db = await getDatabase();
  const filePath = path.join(__dirname, `../i18n/locales/en/${GROUP_SUMMARY_FILE}`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const group of data) {
    await db.run(`
      INSERT OR REPLACE INTO groups (
        ghar, is_babhnaiye, pratham_purush, waasi, gotra, mool,
        total_male_people, total_male_alive, total_male_deceased
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      group.Ghar,
      group["Is Babhnaiye"],
      group["Pratham Purush"],
      group.Waasi,
      group.Gotra,
      group.Mool,
      group["Total Male People"],
      group["Total Male Alive"],
      group["Total Male Deceased"]
    ]);
  }

  console.log(`Migrated ${data.length} group records`);
}

async function runMigration() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();

    console.log('Clearing existing data...');
    const db = await getDatabase();
    await db.run('DELETE FROM people');
    await db.run('DELETE FROM groups');

    await migratePeopleData();
    await migrateGroupData();

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration().catch(console.error);
}

export { runMigration, migratePeopleData, migrateGroupData };