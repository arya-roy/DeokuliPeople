// Advanced search and filtering utilities for people data

export function searchPeople(people, searchCriteria) {
  if (!people || !Array.isArray(people)) return [];

  return people.filter(person => {
    // Text search across multiple fields
    if (searchCriteria.query) {
      const query = searchCriteria.query.toLowerCase();
      const searchableText = [
        person.Name,
        person["Father's Name"],
        person["Mother's Name"],
        person["Mother's Village"],
        person["Marriage village"],
        person["Alias Name"],
        person["1st wife"],
        person["2nd Wife"],
        person.Comment,
        person.PersonID
      ].filter(Boolean).join(' ').toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Filter by alive status
    if (searchCriteria.aliveStatus && searchCriteria.aliveStatus !== 'all') {
      const personAlive = String(person.Alive).trim().toUpperCase();
      if (searchCriteria.aliveStatus === 'yes' && personAlive !== 'YES') return false;
      if (searchCriteria.aliveStatus === 'no' && personAlive !== 'NO') return false;
    }

    // Filter by having children (being a parent)
    if (searchCriteria.hasChildren !== undefined) {
      const isParent = people.some(p => p["ParentID"] === person.PersonID);
      if (searchCriteria.hasChildren && !isParent) return false;
      if (!searchCriteria.hasChildren && isParent) return false;
    }

    // Filter by having parents (not root level)
    if (searchCriteria.hasParents !== undefined) {
      const hasParents = Boolean(person.ParentID && person.ParentID.trim());
      if (searchCriteria.hasParents && !hasParents) return false;
      if (!searchCriteria.hasParents && hasParents) return false;
    }

    // Filter by married status
    if (searchCriteria.married && searchCriteria.married !== 'all') {
      const isMarried = isPersonMarried(person);
      if (searchCriteria.married === 'yes' && !isMarried) return false;
      if (searchCriteria.married === 'no' && isMarried) return false;
    }

    // Filter by marriage village
    if (searchCriteria.marriageVillage) {
      if ((person["Marriage village"] || '').toLowerCase() !== searchCriteria.marriageVillage.toLowerCase()) {
        return false;
      }
    }

    // Filter by mother's village
    if (searchCriteria.motherVillage) {
      if ((person["Mother's Village"] || '').toLowerCase() !== searchCriteria.motherVillage.toLowerCase()) {
        return false;
      }
    }

    // Filter by generation level (approximate based on PersonID pattern)
    if (searchCriteria.generation) {
      const personId = person.PersonID || '';
      const generation = getGenerationFromId(personId);
      if (String(generation) !== searchCriteria.generation) return false;
    }

    return true;
  });
}
export function isPersonMarried(person) {
  return Boolean(
    (person["Marriage village"] && person["Marriage village"].toString().trim()) ||
    (person["1st wife"] && person["1st wife"].toString().trim()) ||
    (person["2nd Wife"] && person["2nd Wife"].toString().trim())
  );
}
export function getGenerationFromId(personId) {
  if (!personId) return 0;

  // Extract numeric part and estimate generation
  const numPart = personId.replace(/\D/g, '');
  if (!numPart) return 0;

  const num = parseInt(numPart, 10);
  if (num < 10) return 1; // N1-N9: Generation 1
  if (num < 100) return 2; // N10-N99: Generation 2
  if (num < 1000) return 3; // N100-N999: Generation 3
  return 4; // N1000+: Generation 4+
}

export function getSearchSuggestions(people, query) {
  if (!query || query.length < 2) return [];

  const suggestions = new Set();
  const queryLower = query.toLowerCase();

  people.forEach(person => {
    // Name suggestions
    if (person.Name && person.Name.toLowerCase().includes(queryLower)) {
      suggestions.add(person.Name);
    }

    // Father's name suggestions
    if (person["Father's Name"] && person["Father's Name"].toLowerCase().includes(queryLower)) {
      suggestions.add(person["Father's Name"]);
    }

    // Location suggestions
    if (person["Marriage village"] && person["Marriage village"].toLowerCase().includes(queryLower)) {
      suggestions.add(person["Marriage village"]);
    }
    if (person["Mother's Village"] && person["Mother's Village"].toLowerCase().includes(queryLower)) {
      suggestions.add(person["Mother's Village"]);
    }
  });

  return Array.from(suggestions).slice(0, 10);
}

export function getFilterOptions(people) {
  const options = {
    marriageVillages: new Set(),
    motherVillages: new Set(),
    generations: new Set(),
    aliveCount: { yes: 0, no: 0 },
    hasChildrenCount: { yes: 0, no: 0 },
    marriedCount: { yes: 0, no: 0 }
  };

  // Build parent-child relationships
  const parentIds = new Set(people.map(p => p.ParentID).filter(Boolean));

  people.forEach(person => {
    // Villages
    if (person["Marriage village"]) options.marriageVillages.add(person["Marriage village"]);
    if (person["Mother's Village"]) options.motherVillages.add(person["Mother's Village"]);

    // Generations
    const generation = getGenerationFromId(person.PersonID);
    options.generations.add(generation);

    // Alive status
    const alive = String(person.Alive).trim().toUpperCase();
    if (alive === 'YES') options.aliveCount.yes++;
    else if (alive === 'NO') options.aliveCount.no++;

    // Has children
    if (parentIds.has(person.PersonID)) {
      options.hasChildrenCount.yes++;
    } else {
      options.hasChildrenCount.no++;
    }

    // Married status
    if (isPersonMarried(person)) {
      options.marriedCount.yes++;
    } else {
      options.marriedCount.no++;
    }
  });

  return {
    marriageVillages: Array.from(options.marriageVillages).sort(),
    motherVillages: Array.from(options.motherVillages).sort(),
    generations: Array.from(options.generations).sort(),
    aliveCount: options.aliveCount,
    hasChildrenCount: options.hasChildrenCount,
    marriedCount: options.marriedCount
  };
}