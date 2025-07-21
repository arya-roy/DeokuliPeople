export function buildFamilyTree(people) {
  const peopleMap = new Map();

  // Create nodes
  people.forEach(person => {
    peopleMap.set(person.id, {
      name: person.name,
      children: [],
    });
  });

  const rootNodes = [];

  // Assign children to father only
  people.forEach(person => {
    if (person.father_id && peopleMap.has(person.father_id)) {
      peopleMap.get(person.father_id).children.push(peopleMap.get(person.id));
    } else {
      rootNodes.push(peopleMap.get(person.id));
    }
  });

  // Return just one node (first root) to avoid rendering errors
  return rootNodes.length > 0 ? rootNodes[0] : {};
}
