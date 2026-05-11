# Database Setup Guide

This guide explains how to set up and use the SQLite database for the Deokuli People genealogy application.

## Prerequisites

Make sure you have Node.js installed and the project dependencies are installed:

```bash
npm install
```

## Database Setup

### 1. Install Database Dependencies

The required dependencies (`sqlite` and `sqlite3`) are already added to `package.json`.

### 2. Run Database Migration

To copy the existing JSON data to the SQLite database:

```bash
npm run migrate
```

This will:
- Create the database file at `src/data/deokuli.db`
- Create the necessary tables (`people` and `groups`)
- Copy all people data from JSON files for all locales (en, hi, mai, kaithi)
- Copy group summary data

### 3. Start the Application

```bash
npm run dev
```

The application will load data from JSON files (for performance in the browser). The database is used for admin operations via command line.

## Admin Interface

Access the admin interface at `/admin` to **view** people data:

- Select language/locale to view data for that language
- Browse all people in a table format
- View person details (read-only)

**Note:** Direct editing in the browser is not available for security and performance reasons. Use the command line tools below for data management.

## Command Line Database Administration

Use these commands to manage your genealogy data:

### Setup Database
```bash
npm run migrate
```

### View Database Statistics
```bash
npm run db-admin stats
```

### List People
```bash
npm run db-admin list [locale]
```
Example: `npm run db-admin list hi`

### Add New Person
```bash
npm run db-admin add <personId> <name> <fathersName> [locale]
```
Example: `npm run db-admin add N100 "John Doe" "Jane Doe"`

### Update Person Data
```bash
npm run db-admin update <personId> <field> <value> [locale]
```
Example: `npm run db-admin update N1 Name "Updated Name"`

### Delete Person
```bash
npm run db-admin delete <personId> [locale]
```
Example: `npm run db-admin delete N100`

## Database Schema

### People Table
- `id`: Primary key (auto-increment)
- `person_id`: Unique person identifier (e.g., "N1", "N2")
- `parent_id`: Parent person ID for family tree relationships
- `locale`: Language/locale code ("en", "hi", "mai", "kaithi")
- `name`: Person's name
- `fathers_name`: Father's name
- `mothers_name`: Mother's name
- `mothers_village`: Mother's village
- `alive`: "YES" or "NO"
- `marriage_village`: Marriage village
- `alias_name`: Alias name
- `first_wife`: First wife's name
- `second_wife`: Second wife's name
- `comment`: Additional comments
- `created_at`: Record creation timestamp
- `updated_at`: Record update timestamp

### Groups Table
- `id`: Primary key (auto-increment)
- `ghar`: Family/house name
- `is_babhnaiye`: Babhnaiye status
- `pratham_purush`: First person name
- `waasi`: Residence information
- `gotra`: Gotra (clan)
- `mool`: Origin
- `total_male_people`: Total male members
- `total_male_alive`: Living male members
- `total_male_deceased`: Deceased male members
- `created_at`: Record creation timestamp
- `updated_at`: Record update timestamp

## Admin Interface

Access the admin interface at `/admin` to edit people data:

- Select language/locale to edit data for that language
- View all people in a table format
- Edit existing people
- Add new people
- Delete people

## Data Management

### Command Line Tools
- Edit data separately for each supported language (English, Hindi, Maithili, Kaithi)
- Changes in one language don't affect others
- Maintain translations for all fields

### CRUD Operations
- **Create**: Add new people with all their information
- **Read**: View all people data via command line
- **Update**: Edit any person's information via command line
- **Delete**: Remove people from the database via command line

## Backup and Recovery

The original JSON files are kept as fallback, so the application will continue to work even if the database is unavailable.

To backup the database:
```bash
cp src/data/deokuli.db src/data/deokuli_backup.db
```

## Troubleshooting

### Database Not Found
If the database file is missing, the application will automatically fall back to JSON files.

### Migration Issues
If migration fails:
1. Check that JSON files exist in the correct locations
2. Ensure write permissions for the `src/data/` directory
3. Run migration again

### Admin Interface Issues
- Make sure you're accessing `/admin` route
- Check browser console for any JavaScript errors
- The admin interface is read-only; use command line tools for editing

### Command Line Tool Issues
- Ensure database is properly initialized with `npm run migrate`
- Check that you have proper permissions for database operations
- Use `npm run test-db` to verify database connectivity

## Development Notes

- Database queries are in `src/database/queries.js`
- Database connection is managed in `src/database/db.js`
- Migration script is in `src/database/migrate.js`
- Schema is defined in `src/database/schema.sql`