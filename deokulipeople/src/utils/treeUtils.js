export function transformToTreeData(people) {
  const idMap = new Map();
  people.forEach((p) => idMap.set(p.ID, { ...p, children: [] }));

  const rootNodes = [];

  people.forEach((person) => {
    const node = idMap.get(person.ID);
    node.name = person.Name;
    node.rawData = person;

    if (person.Father && idMap.has(person.Father)) {
      idMap.get(person.Father).children.push(node);
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}

export function getAncestorsGroupedByGeneration(startId, people) {
  const grouped = {};
  const visited = new Set();

  function recurse(currentId, generation) {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const person = people.find(p => String(p.PersonID) === String(currentId));
    if (!person) return;

    const parent = people.find(p => String(p.PersonID) === String(person.ParentID));
    if (parent) {
      const gen = generation - 1;
      if (!grouped[gen]) grouped[gen] = [];
      grouped[gen].push(parent);
      recurse(parent.PersonID, gen);
    }
  }

  recurse(startId, 0);
  return grouped;
}

export function getDescendantsGroupedByGeneration(startId, people) {
  const grouped = {};
  const visited = new Set();

  function recurse(currentId, generation) {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const children = people.filter(
      p => String(p.ParentID) === String(currentId)
    );

    for (const child of children) {
      const gen = generation + 1;
      if (!grouped[gen]) grouped[gen] = [];
      grouped[gen].push(child);
      recurse(child.PersonID, gen);
    }
  }

  recurse(startId, 0);
  return grouped;
}

