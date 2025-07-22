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
