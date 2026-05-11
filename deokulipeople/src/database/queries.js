import { getDatabase } from './db.js';

export async function loadPeopleDataFromDB(locale = 'en') {
  const db = await getDatabase();

  const rows = await db.all(`
    SELECT
      person_id as PersonID,
      parent_id as ParentID,
      name as Name,
      fathers_name as "Father's Name",
      mothers_name as "Mother's Name",
      mothers_village as "Mother's Village",
      alive as Alive,
      marriage_village as "Marriage village",
      alias_name as "Alias Name",
      first_wife as "1st wife",
      second_wife as "2nd Wife",
      comment as Comment
    FROM people
    WHERE locale = ?
    ORDER BY person_id
  `, [locale]);

  return rows;
}

export async function loadGroupSummaryDataFromDB() {
  const db = await getDatabase();

  const rows = await db.all(`
    SELECT
      ghar as Ghar,
      is_babhnaiye as "Is Babhnaiye",
      pratham_purush as "Pratham Purush",
      waasi as Waasi,
      gotra as Gotra,
      mool as Mool,
      total_male_people as "Total Male People",
      total_male_alive as "Total Male Alive",
      total_male_deceased as "Total Male Deceased"
    FROM groups
    ORDER BY ghar
  `);

  return rows;
}

export async function loadPeopleJsonFromDB() {
  // For backward compatibility, return all English data
  return loadPeopleDataFromDB('en');
}

// CRUD operations for editing data
export async function updatePerson(personId, locale, updates) {
  const db = await getDatabase();

  const fields = [];
  const values = [];

  Object.entries(updates).forEach(([key, value]) => {
    // Map frontend field names to database column names
    const columnMap = {
      'Name': 'name',
      "Father's Name": 'fathers_name',
      "Mother's Name": 'mothers_name',
      "Mother's Village": 'mothers_village',
      'Alive': 'alive',
      'Marriage village': 'marriage_village',
      'Alias Name': 'alias_name',
      '1st wife': 'first_wife',
      '2nd Wife': 'second_wife',
      'Comment': 'comment'
    };

    const column = columnMap[key];
    if (column) {
      fields.push(`${column} = ?`);
      values.push(value);
    }
  });

  if (fields.length === 0) return;

  values.push(personId, locale);

  await db.run(`
    UPDATE people
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE person_id = ? AND locale = ?
  `, values);
}

export async function addPerson(personData) {
  const db = await getDatabase();

  await db.run(`
    INSERT INTO people (
      person_id, parent_id, locale, name, fathers_name, mothers_name,
      mothers_village, alive, marriage_village, alias_name,
      first_wife, second_wife, comment
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    personData.PersonID,
    personData.ParentID,
    personData.locale || 'en',
    personData.Name,
    personData["Father's Name"],
    personData["Mother's Name"],
    personData["Mother's Village"],
    personData.Alive,
    personData["Marriage village"],
    personData["Alias Name"],
    personData["1st wife"],
    personData["2nd Wife"],
    personData.Comment
  ]);
}

export async function deletePerson(personId, locale = 'en') {
  const db = await getDatabase();

  await db.run('DELETE FROM people WHERE person_id = ? AND locale = ?', [personId, locale]);
}