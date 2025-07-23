export const buildCombinedTree = (rootPersonId, people) => {
  const getPersonById = (id) => people.find((p) => String(p.PersonID) === String(id));

  // Build a flat array of ancestors from the root up to the top-most ancestor
  const getAncestorChain = (person) => {
    const chain = [];
    let current = person;

    while (current && current.ParentID) {
      const parent = getPersonById(current.ParentID);
      if (!parent) {
        console.log("Parent not found for:", current.Name, current.PersonID);
        break;
      }
      console.log("Adding ancestor:", parent.Name, parent.PersonID);
      chain.unshift(parent); // Add to the beginning to reverse order
      current = parent;
    }

    return chain;
  };

  const buildDescendants = (person) => {
    const children = people.filter((p) => String(p.ParentID) === String(person.PersonID));
    if (children.length > 0) {
      console.log(`Found ${children.length} children for ${person.Name} (${person.PersonID})`);
    }

    return children.map((child) => {
      console.log("Adding descendant:", child.Name, child.PersonID);
      return {
        name: child.Name || `Unknown (${child.PersonID})`,
        attributes: {
          PersonID: child.PersonID,
          Ghar: child.Ghar || "",
        },
        children: buildDescendants(child),
      };
    });
  };

  const rootPerson = getPersonById(rootPersonId);
  if (!rootPerson) {
    console.error("Root person not found for ID:", rootPersonId);
    return null;
  }

  console.log("Building tree for root person:", rootPerson.Name, rootPerson.PersonID);

  // Build the root node (with descendants only for now)
  const rootNode = {
    name: rootPerson.Name || `Unknown (${rootPerson.PersonID})`,
    attributes: {
      PersonID: rootPerson.PersonID,
      Ghar: rootPerson.Ghar || "",
    },
    children: buildDescendants(rootPerson),
  };

  const ancestorChain = getAncestorChain(rootPerson);

  if (ancestorChain.length > 0) {
    console.log("Building reversed ancestor tree...");

    // Start with root node as the innermost child
    let combinedTree = rootNode;

    // Traverse the reversed chain to wrap the root node upward
    for (let i = ancestorChain.length - 1; i >= 0; i--) {
      const ancestor = ancestorChain[i];
      combinedTree = {
        name: ancestor.Name || `Unknown (${ancestor.PersonID})`,
        attributes: {
          PersonID: ancestor.PersonID,
          Ghar: ancestor.Ghar || "",
        },
        children: [combinedTree],
      };
    }

    console.log("Returning full tree with reversed ancestors + descendants.");
    return combinedTree;
  }

  console.log("Returning tree rooted at person (no ancestors found)");
  return rootNode;
};
