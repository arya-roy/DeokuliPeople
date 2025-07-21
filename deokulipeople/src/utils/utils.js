// src/utils.js

export const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export const deslugify = (slug) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
