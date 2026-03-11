import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  getProfile,
  getProjects,
  getExperiences,
  getTechnologies,
} from '../services';
import {
  PROFILE_QUERY,
  PROJECTS_QUERY,
  EXPERIENCES_QUERY,
  TECHNOLOGIES_QUERY,
} from '../queries';
import {
  createMockProfile,
  createMockProject,
  createMockExperience,
  createMockTechnology,
} from './fixtures';

const mockFetch = vi.fn();

vi.mock('../client', () => ({
  client: {
    fetch: (...args: unknown[]) => mockFetch(...args),
  },
}));

describe('Sanity services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('getProfile fetches with PROFILE_QUERY', async () => {
    const mockProfile = createMockProfile();
    mockFetch.mockResolvedValue(mockProfile);

    const result = await getProfile();

    expect(mockFetch).toHaveBeenCalledWith(PROFILE_QUERY);
    expect(result).toEqual(mockProfile);
  });

  it('getProjects fetches with PROJECTS_QUERY', async () => {
    const mockProjects = [createMockProject(), createMockProject()];
    mockFetch.mockResolvedValue(mockProjects);

    const result = await getProjects();

    expect(mockFetch).toHaveBeenCalledWith(PROJECTS_QUERY);
    expect(result).toEqual(mockProjects);
  });

  it('getExperiences fetches with EXPERIENCES_QUERY', async () => {
    const mockExperiences = [createMockExperience(), createMockExperience()];
    mockFetch.mockResolvedValue(mockExperiences);

    const result = await getExperiences();

    expect(mockFetch).toHaveBeenCalledWith(EXPERIENCES_QUERY);
    expect(result).toEqual(mockExperiences);
  });

  it('getTechnologies fetches with TECHNOLOGIES_QUERY', async () => {
    const mockTechnologies = [createMockTechnology(), createMockTechnology()];
    mockFetch.mockResolvedValue(mockTechnologies);

    const result = await getTechnologies();

    expect(mockFetch).toHaveBeenCalledWith(TECHNOLOGIES_QUERY);
    expect(result).toEqual(mockTechnologies);
  });
});
