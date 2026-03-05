import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  title: 'Portfolio',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [],
  },
});

export default config;
