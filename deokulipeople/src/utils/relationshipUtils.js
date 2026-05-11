// Relationship finder utilities

export function getAllAncestors(personId, people) {
  const ancestors = new Set();
  const visited = new Set();

  function recurse(currentId) {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const person = people.find(p => String(p.PersonID) === String(currentId));
    if (!person || !person.ParentID) return;

    const parent = people.find(p => String(p.PersonID) === String(person.ParentID));
    if (parent) {
      ancestors.add(parent.PersonID);
      recurse(parent.PersonID);
    }
  }

  recurse(personId);
  return Array.from(ancestors).map(id => people.find(p => p.PersonID === id));
}

export function findCommonAncestors(person1, person2, people) {
  const ancestors1 = new Set(getAllAncestors(person1.PersonID, people).map(p => p.PersonID));
  const ancestors2 = new Set(getAllAncestors(person2.PersonID, people).map(p => p.PersonID));

  const common = [];
  for (const id of ancestors1) {
    if (ancestors2.has(id)) {
      common.push(people.find(p => p.PersonID === id));
    }
  }

  return common;
}

export function getGenerationDistance(person, ancestor, people) {
  let distance = 0;
  let current = person;

  while (current && current.PersonID !== ancestor.PersonID) {
    distance++;
    const parent = people.find(p => String(p.PersonID) === String(current.ParentID));
    if (!parent) break;
    current = parent;
  }

  return distance;
}

export function calculateRelationship(person1, person2, commonAncestors, people) {
  if (commonAncestors.length === 0) {
    return 'not related';
  }

  // Find the closest common ancestor
  let closestAncestor = null;
  let minDistance1 = Infinity;
  let minDistance2 = Infinity;

  for (const ancestor of commonAncestors) {
    const dist1 = getGenerationDistance(person1, ancestor, people);
    const dist2 = getGenerationDistance(person2, ancestor, people);

    if (dist1 < minDistance1 || (dist1 === minDistance1 && dist2 < minDistance2)) {
      minDistance1 = dist1;
      minDistance2 = dist2;
      closestAncestor = ancestor;
    }
  }

  if (!closestAncestor) return 'not related';

  const gen1 = minDistance1;
  const gen2 = minDistance2;

  if (gen1 === 1 && gen2 === 1) {
    return 'siblings';
  }

  const cousinLevel = Math.min(gen1, gen2) - 1;
  const removal = Math.abs(gen1 - gen2);

  if (cousinLevel === 0) {
    if (removal === 1) return 'parent-child';
    if (removal === 2) return 'grandparent-grandchild';
    // etc.
  }

  let relation = '';
  if (cousinLevel === 1) relation = '1st cousins';
  else if (cousinLevel === 2) relation = '2nd cousins';
  else if (cousinLevel === 3) relation = '3rd cousins';
  else relation = `${cousinLevel}th cousins`;

  if (removal > 0) {
    if (removal === 1) relation += ' once removed';
    else relation += ` ${removal} times removed`;
  }

  return relation;
}

export function findConnectionPath(person1, person2, people) {
  const commonAncestors = findCommonAncestors(person1, person2, people);

  if (commonAncestors.length === 0) {
    return 'No direct family connection found';
  }

  // For simplicity, show path through the first common ancestor
  const ancestor = commonAncestors[0];

  const path1 = getPathToAncestor(person1, ancestor, people);
  const path2 = getPathToAncestor(person2, ancestor, people);

  return `${person1.Name} -> ${path1.join(' -> ')} -> ${ancestor.Name} <- ${path2.reverse().join(' <- ')} <- ${person2.Name}`;
}

function getPathToAncestor(person, ancestor, people) {
  const path = [];
  let current = person;

  while (current && current.PersonID !== ancestor.PersonID) {
    path.push(current.Name);
    const parent = people.find(p => String(p.PersonID) === String(current.ParentID));
    if (!parent) break;
    current = parent;
  }

  return path.reverse();
}