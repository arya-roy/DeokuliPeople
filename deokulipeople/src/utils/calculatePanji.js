export const calculatePanji = (personId, people) => {
  const getPersonById = (id) => people.find((p) => String(p.PersonID) === String(id));
  const logs = [];

  const results = [];

  // 🧬 Paternal Lineage (up to 7 generations)
  let currentPerson = getPersonById(personId);
  for (let gen = 1; gen <= 7; gen++) {
    if (!currentPerson) break;

    const label =
      gen === 1
        ? "Self"
        : gen === 2
        ? "Father"
        : gen === 3
        ? "Grandfather"
        : gen === 4
        ? "Great Grandfather"
        : `${gen}th Gen Ancestor`;

    logs.push(`Gen ${gen} Paternal: ${currentPerson?.Name || "Unknown"}`);
    results.push({
      generation: gen,
      side: "paternal",
      label,
      name: currentPerson?.Name || "",
      village: "Deokuli Dham",
    });

    currentPerson = getPersonById(currentPerson?.ParentID);
  }

  // 🌸 Maternal Lineage (up to 4 generations — even if empty)
  let motherName = getPersonById(personId)?.["Mother's Name"] || "";
  let motherVillage = getPersonById(personId)?.["Mother's Village"] || "";

  for (let gen = 2; gen <= 5; gen++) {
    const label =
      gen === 2
        ? "Mother"
        : gen === 3
        ? "Maternal Grandmother"
        : gen === 4
        ? "Maternal Great Grandmother"
        : `${gen}th Gen Maternal Ancestor`;

    logs.push(`Gen ${gen} Maternal: ${motherName || "[empty]"}`);

    results.push({
      generation: gen,
      side: "maternal",
      label,
      name: motherName || "",
      village: motherVillage || "",
    });

    // Try to find next maternal ancestor if recorded
    const found = people.find(
      (p) => p["Name"] === motherName && p["Mother's Name"]
    );

    motherName = found?.["Mother's Name"] || "";
    motherVillage = found?.["Mother's Village"] || "";
  }

  console.log("🧾 Panji Calculation Logs:", logs);
  console.log("📋 Final Panji Result:", results);

  return results;
};
