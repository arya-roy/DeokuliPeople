export function getAncestorsGroupedByGeneration(startId, people) {
  const grouped = {};
  const visited = new Set();

  function recurse(currentId, generation) {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const person = people.find(p => String(p.PersonID) === String(currentId));
    if (!person || !person.ParentID) return; // ⛔ stop if no valid parent ID

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
