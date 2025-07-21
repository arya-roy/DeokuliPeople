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
