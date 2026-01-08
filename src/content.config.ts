import { defineCollection, z } from "astro:content";
import { microCMSContentLoader } from "microcms-astro-loader";

// Get environment variables with fallback for build time
const getServiceDomain = () => import.meta.env.MICROCMS_SERVICE_DOMAIN || "dummy";
const getApiKey = () => import.meta.env.MICROCMS_API_KEY || "dummy";

// Lecture Collection
const lectureCollection = defineCollection({
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "lectures",
    queries: {
      fields: [
        "id",
        "title",
        "title_en",
        "guest_name",
        "guest_name_en",
        "belonging",
        "belonging_en",
        "event_date",
        "eyecatch",
        "content",
        "createdAt",
        "updatedAt",
        "publishedAt",
        "revisedAt",
      ],
      limit: 100,
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    title_en: z.string().optional(),
    guest_name: z.string(),
    guest_name_en: z.string().optional(),
    belonging: z.string().optional(),
    belonging_en: z.string().optional(),
    event_date: z.string(),
    eyecatch: z
      .object({
        url: z.string().url(),
        height: z.number(),
        width: z.number(),
      })
      .optional(),
    content: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    revisedAt: z.string(),
  }),
});

// Member Collection
const memberCollection = defineCollection({
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "members",
    queries: {
      fields: [
        "id",
        "name",
        "name_en",
        "position",
        "position_en",
        "year",
        "year_en",
        "description",
        "description_en",
        "status",
        "image",
        "createdAt",
        "updatedAt",
        "publishedAt",
        "revisedAt",
      ],
      limit: 100,
    },
  }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    name_en: z.string().optional(),
    position: z.string(),
    position_en: z.string().optional(),
    year: z.string(),
    year_en: z.string().optional(),
    description: z.string(),
    description_en: z.string().optional(),
    status: z
      .union([
        z.literal("current"),
        z.literal("graduate"),
        z.array(z.union([z.literal("current"), z.literal("graduate")])),
      ])
      .optional(),
    image: z
      .object({
        url: z.string().url(),
        height: z.number(),
        width: z.number(),
      })
      .optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    revisedAt: z.string(),
  }),
});

// Upcoming Event Collection
const upcomingEventCollection = defineCollection({
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "upcoming_events",
    queries: {
      fields: [
        "id",
        "title",
        "title_en",
        "event_date",
        "description",
        "description_en",
        "location",
        "location_en",
        "createdAt",
        "updatedAt",
        "publishedAt",
        "revisedAt",
      ],
      limit: 100,
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    title_en: z.string().optional(),
    event_date: z.string(),
    description: z.string(),
    description_en: z.string().optional(),
    location: z.string().optional(),
    location_en: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    revisedAt: z.string(),
  }),
});

// Media Coverage Collection
const mediaCoverageCollection = defineCollection({
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "media_coverage",
    queries: {
      fields: [
        "id",
        "title",
        "media_name",
        "publish_date",
        "url",
        "description",
        "createdAt",
        "updatedAt",
        "publishedAt",
        "revisedAt",
      ],
      limit: 100,
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    media_name: z.string(),
    publish_date: z.string(),
    url: z.string().url().optional(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    revisedAt: z.string(),
  }),
});

// Note: faqs and sponsors are repeater fields in the "pages" singleton endpoint,
// not independent list endpoints. They should be accessed via getPages() from microcms.ts

export const collections = {
  lectures: lectureCollection,
  members: memberCollection,
  upcoming_events: upcomingEventCollection,
  media_coverage: mediaCoverageCollection,
};
