import { defineQuery } from 'next-sanity';

export const PROFILE_QUERY = defineQuery(`*[_type == "profile"][0]`);
export const PROJECTS_QUERY = defineQuery(`*[_type == "project"]`);
export const EXPERIENCES_QUERY = defineQuery(`*[_type == "experience"]`);
export const TECHNOLOGIES_QUERY = defineQuery(`*[_type == "technology"]`);
export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial"] | order(orderRank asc)`,
);
export const PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]`,
);
export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]`);
