import { client } from './client';
import {
  PROFILE_QUERY,
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  EXPERIENCES_QUERY,
  TECHNOLOGIES_QUERY,
  TESTIMONIALS_QUERY,
  SETTINGS_QUERY,
} from './queries';

export async function getProfile() {
  return client.fetch(PROFILE_QUERY);
}

export async function getProjects() {
  return client.fetch(PROJECTS_QUERY);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
}

export async function getExperiences() {
  return client.fetch(EXPERIENCES_QUERY);
}

export async function getTechnologies() {
  return client.fetch(TECHNOLOGIES_QUERY);
}

export async function getTestimonials() {
  return client.fetch(TESTIMONIALS_QUERY);
}

export async function getSettings() {
  return client.fetch(SETTINGS_QUERY);
}
