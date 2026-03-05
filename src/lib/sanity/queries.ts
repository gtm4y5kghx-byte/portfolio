import { defineQuery } from 'next-sanity';

export const PROFILE_QUERY = defineQuery(`*[_type == "profile"][0]`);
export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(orderRank asc)`,
);
export const EXPERIENCES_QUERY = defineQuery(
  `*[_type == "experience"] | order(startDate desc)`,
);
export const SKILLS_QUERY = defineQuery(`*[_type == "skill"]`);
export const TECHNOLOGIES_QUERY = defineQuery(`*[_type == "technology"]`);
