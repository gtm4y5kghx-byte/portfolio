import { defineQuery } from 'next-sanity';

export const PROFILE_QUERY = defineQuery(`*[_type == "profile"][0]`);
export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(orderRank asc)`,
);
export const EXPERIENCES_QUERY = defineQuery(
  `*[_type == "experience"] | order(orderRank asc)`,
);
export const TECHNOLOGIES_QUERY = defineQuery(`*[_type == "technology"]`);
export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]`);
