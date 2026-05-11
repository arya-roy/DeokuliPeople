-- Database schema for Deokuli People genealogy data

-- People table with locale support
CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id TEXT NOT NULL,
    parent_id TEXT,
    locale TEXT NOT NULL DEFAULT 'en',
    name TEXT,
    fathers_name TEXT,
    mothers_name TEXT,
    mothers_village TEXT,
    alive TEXT,
    marriage_village TEXT,
    alias_name TEXT,
    first_wife TEXT,
    second_wife TEXT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(person_id, locale)
);

-- Groups/Families summary table
CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ghar TEXT NOT NULL,
    is_babhnaiye TEXT,
    pratham_purush TEXT,
    waasi TEXT,
    gotra TEXT,
    mool TEXT,
    total_male_people INTEGER DEFAULT 0,
    total_male_alive INTEGER DEFAULT 0,
    total_male_deceased INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_people_person_id ON people(person_id);
CREATE INDEX IF NOT EXISTS idx_people_parent_id ON people(parent_id);
CREATE INDEX IF NOT EXISTS idx_people_locale ON people(locale);
CREATE INDEX IF NOT EXISTS idx_groups_ghar ON groups(ghar);