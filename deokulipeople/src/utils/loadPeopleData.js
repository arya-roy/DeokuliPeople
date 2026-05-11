const localeUrls = {
  en: new URL('../i18n/locales/en/Deokuli_A_All.json', import.meta.url).href,
  hi: new URL('../i18n/locales/hi/DeokuliAneriyeAll_hi.json', import.meta.url).href,
  mai: new URL('../i18n/locales/hi/DeokuliAneriyeAll_hi.json', import.meta.url).href,
  kaithi: new URL('../i18n/locales/hi/DeokuliAneriyeAll_hi.json', import.meta.url).href,
};

export async function loadPeopleData(locale = 'en') {
  // Load from JSON files (database operations are handled separately for admin)
  const normalizedLocale = locale?.toLowerCase();
  const url = localeUrls[normalizedLocale] || localeUrls.en;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch people data for ${normalizedLocale}: ${response.status}`);
  }
  return await response.json();
}

export async function loadGroupSummaryData() {
  const url = new URL('../i18n/locales/en/DeokuliGroupSummary_en.json', import.meta.url).href;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch group summary data: ${response.status}`);
  }
  return await response.json();
}

export async function loadPeopleJson() {
  const url = new URL('../data/people.json', import.meta.url).href;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch people.json: ${response.status}`);
  }
  return await response.json();
}
