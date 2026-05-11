import { initializeDatabase, getDatabase } from '../database/db.js';
import { loadPeopleDataFromDB } from '../database/queries.js';

async function testDatabase() {
  try {
    console.log('Testing database setup...');

    // Initialize database
    await initializeDatabase();
    console.log('✓ Database initialized');

    // Test loading data
    const data = await loadPeopleDataFromDB('en');
    console.log(`✓ Loaded ${data.length} people records from database`);

    // Test database connection
    const db = await getDatabase();
    const result = await db.get('SELECT COUNT(*) as count FROM people');
    console.log(`✓ Database contains ${result.count} total people records`);

    console.log('All database tests passed!');
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testDatabase();