import { nanoid } from 'nanoid'
import type { Decision, Template } from '@/types'

const TEMPLATES: Template[] = [
  {
    slug: 'job-offer',
    name: 'Job Offer',
    description: 'Torn between two job offers? Score what matters most — salary, culture, growth — and let the numbers decide.',
    icon: 'Briefcase',
    metaTitle: 'Job Offer Comparison Tool | DecideNow',
    metaDescription: 'Compare two job offers with weighted scoring. Evaluate salary, culture, growth potential, work-life balance, and benefits side by side.',
    defaultCriteria: [
      { name: 'Salary & Compensation', importance: 10 },
      { name: 'Work-Life Balance', importance: 9 },
      { name: 'Career Growth', importance: 9 },
      { name: 'Company Culture', importance: 8 },
      { name: 'Location / Remote Flexibility', importance: 7 },
      { name: 'Benefits & Perks', importance: 7 },
      { name: 'Job Security', importance: 6 },
      { name: 'Management Quality', importance: 8 },
    ],
  },
  {
    slug: 'relationship',
    name: 'Relationship',
    description: 'A gut-check tool for when your heart can\'t decide. Score what you value in a partner.',
    icon: 'Heart',
    metaTitle: 'Relationship Comparison Tool | DecideNow',
    metaDescription: 'Reflect on two potential partners using weighted scoring. Compare chemistry, values, communication, and life goals.',
    defaultCriteria: [
      { name: 'Chemistry & Attraction', importance: 10 },
      { name: 'Shared Values', importance: 10 },
      { name: 'Communication', importance: 9 },
      { name: 'Life Goals Alignment', importance: 9 },
      { name: 'Emotional Maturity', importance: 8 },
      { name: 'Humor & Fun', importance: 7 },
      { name: 'Ambition & Drive', importance: 6 },
      { name: 'Family Compatibility', importance: 7 },
    ],
  },
  {
    slug: 'vacation',
    name: 'Vacation',
    description: 'Can\'t pick between two trips? Score vibes, cost, and experiences to find your perfect getaway.',
    icon: 'Plane',
    metaTitle: 'Vacation Destination Comparison | DecideNow',
    metaDescription: 'Compare two vacation destinations with weighted scoring on cost, activities, weather, and travel time.',
    defaultCriteria: [
      { name: 'Total Cost', importance: 10 },
      { name: 'Activities & Experiences', importance: 9 },
      { name: 'Weather', importance: 8 },
      { name: 'Travel Time', importance: 7 },
      { name: 'Safety', importance: 9 },
      { name: 'Accommodation Quality', importance: 7 },
      { name: 'Local Food & Culture', importance: 6 },
    ],
  },
  {
    slug: 'college',
    name: 'College / University',
    description: 'A big decision that\'s deeply personal. Score what actually matters to you beyond the rankings.',
    icon: 'GraduationCap',
    metaTitle: 'College Comparison Tool | DecideNow',
    metaDescription: 'Compare two colleges or universities with weighted scoring on academics, tuition, campus life, and career outcomes.',
    defaultCriteria: [
      { name: 'Academic Reputation', importance: 10 },
      { name: 'Tuition & Financial Aid', importance: 10 },
      { name: 'Location', importance: 8 },
      { name: 'Campus Life & Community', importance: 7 },
      { name: 'Career Outcomes', importance: 9 },
      { name: 'Class Sizes', importance: 6 },
      { name: 'Social Scene', importance: 6 },
    ],
  },
  {
    slug: 'city',
    name: 'City to Move To',
    description: 'Deciding where to live next? Score cost of living, job market, lifestyle, and more.',
    icon: 'MapPin',
    metaTitle: 'City Comparison Tool | DecideNow',
    metaDescription: 'Compare two cities to move to with weighted scoring. Evaluate cost of living, job market, lifestyle, weather, and social scene.',
    defaultCriteria: [
      { name: 'Cost of Living', importance: 10 },
      { name: 'Job Market', importance: 9 },
      { name: 'Climate / Weather', importance: 7 },
      { name: 'Social & Dating Scene', importance: 8 },
      { name: 'Safety', importance: 9 },
      { name: 'Proximity to Family', importance: 7 },
      { name: 'Lifestyle & Things to Do', importance: 8 },
    ],
  },
  {
    slug: 'international-job-offer',
    name: 'International Job Offer',
    description: 'Moving abroad for work? Compare salary in context, quality of life, visa hassle, and how far you\'ll be from the people you love.',
    icon: 'Globe',
    metaTitle: 'International Job Offer Comparison | DecideNow',
    metaDescription: 'Compare two international job offers with weighted scoring on purchasing power, cost of living, quality of life, and closeness to family.',
    defaultCriteria: [
      { name: 'Salary (Purchasing Power Adjusted)', importance: 10 },
      { name: 'Cost of Living', importance: 9 },
      { name: 'Quality of Life / Ease of Living', importance: 9 },
      { name: 'Closeness to Family & Friends', importance: 8 },
      { name: 'Career Growth & Opportunities', importance: 9 },
      { name: 'Visa & Immigration Process', importance: 7 },
      { name: 'Language & Cultural Fit', importance: 7 },
      { name: 'Healthcare Quality', importance: 8 },
      { name: 'Social Scene', importance: 6 },
      { name: 'Climate & Environment', importance: 6 },
      { name: 'Job Security', importance: 7 },
    ],
  },
  {
    slug: 'blank',
    name: 'Custom Decision',
    description: 'Your call, your criteria. Start from scratch and build a comparison for anything.',
    icon: 'PlusCircle',
    metaTitle: 'Custom Decision Tool | DecideNow',
    metaDescription: 'Create a fully custom weighted decision comparison. Add your own criteria, set importance weights, and score any two options.',
    defaultCriteria: [],
  },
]

export function getTemplate(slug: string): Template | null {
  return TEMPLATES.find((t) => t.slug === slug) ?? null
}

export function listTemplates(): Template[] {
  return TEMPLATES
}

export function getFeaturedTemplates(): Template[] {
  return TEMPLATES.slice(0, 6)
}

export function seedDecision(template: Template): Decision {
  const now = new Date().toISOString()
  const isBlank = template.slug === 'blank'
  return {
    id: nanoid(10),
    title: isBlank ? 'My Decision' : `${template.name} Decision`,
    optionAName: 'Option A',
    optionBName: 'Option B',
    templateSlug: isBlank ? null : template.slug,
    criteria: template.defaultCriteria.map((c) => ({
      ...c,
      id: nanoid(10),
      scoreA: 0,
      scoreB: 0,
    })),
    createdAt: now,
    updatedAt: now,
  }
}
