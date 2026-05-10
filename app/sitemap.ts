import type { MetadataRoute } from 'next'
import { listTemplates } from '@/lib/templates'

const BASE_URL = 'https://decidenow.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const templates = listTemplates()

  const templateRoutes: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${BASE_URL}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...templateRoutes,
  ]
}
