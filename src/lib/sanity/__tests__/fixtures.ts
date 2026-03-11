import { faker } from '@faker-js/faker';

export function createMockProfile() {
  return {
    _id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.person.jobTitle(),
    bio: [],
    photo: null,
    heroDescription: [],
    socialLinks: [
      {
        platform: faker.helpers.arrayElement(['github', 'linkedin']),
        url: faker.internet.url(),
      },
    ],
  };
}

export function createMockProject() {
  return {
    _id: faker.string.uuid(),
    title: faker.commerce.productName(),
    slug: {
      current: faker.helpers
        .slugify(faker.commerce.productName())
        .toLowerCase(),
    },
    subtitle: faker.commerce.productDescription(),
    thumbnail: null,
    url: faker.internet.url(),
    orderRank: faker.number.int({ min: 1, max: 10 }),
  };
}

export function createMockExperience() {
  return {
    _id: faker.string.uuid(),
    company: faker.company.name(),
    role: faker.person.jobTitle(),
    description: [],
    startDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
    endDate:
      faker.helpers.maybe(
        () => faker.date.recent().toISOString().split('T')[0],
        {
          probability: 0.5,
        },
      ) ?? null,
    url: faker.internet.url(),
  };
}

export function createMockTechnology() {
  return {
    _id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'React',
      'TypeScript',
      'Swift',
      'Go',
      'Vue',
    ]),
    icon: null,
    category: faker.helpers.arrayElement([
      'Frontend',
      'Backend',
      'Mobile',
      'Language',
    ]),
  };
}

export function createMockSettings() {
  return {
    _id: faker.string.uuid(),
    siteTitle: faker.company.name(),
    seoDescription: faker.lorem.sentence(),
    seoImage: null,
    footerContent: [],
  };
}
