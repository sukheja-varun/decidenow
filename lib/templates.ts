import { nanoid } from 'nanoid'
import type { Decision, Template } from '@/types'

const TEMPLATES: Template[] = [
  {
    slug: 'real-estate',
    name: 'Real Estate / House',
    description: 'Compare two properties across key factors like location, price, and space.',
    icon: 'Home',
    metaTitle: 'House Comparison Tool | DecideNow',
    metaDescription: 'Compare two houses or properties with a weighted scoring tool. Score location, price, bedrooms, commute, and more to find your ideal home.',
    defaultCriteria: [
      { name: 'Location / Neighborhood', importance: 10 },
      { name: 'Price', importance: 9 },
      { name: 'Bedrooms', importance: 8 },
      { name: 'Bathrooms', importance: 7 },
      { name: 'Commute Distance', importance: 8 },
      { name: 'Size / Square Footage', importance: 7 },
      { name: 'Condition / Age', importance: 6 },
      { name: 'Outdoor Space', importance: 5 },
    ],
  },
  {
    slug: 'job-offer',
    name: 'Job Offer',
    description: 'Evaluate two job offers across salary, growth, culture, and work-life balance.',
    icon: 'Briefcase',
    metaTitle: 'Job Offer Comparison Tool | DecideNow',
    metaDescription: 'Compare two job offers with weighted scoring. Evaluate salary, culture, growth potential, work-life balance, and benefits side by side.',
    defaultCriteria: [
      { name: 'Salary & Compensation', importance: 10 },
      { name: 'Work-Life Balance', importance: 9 },
      { name: 'Career Growth', importance: 9 },
      { name: 'Company Culture', importance: 8 },
      { name: 'Location / Remote', importance: 7 },
      { name: 'Benefits & Perks', importance: 7 },
      { name: 'Job Security', importance: 6 },
      { name: 'Management Quality', importance: 8 },
    ],
  },
  {
    slug: 'car',
    name: 'Car Purchase',
    description: 'Compare two vehicles on price, reliability, features, and running costs.',
    icon: 'Car',
    metaTitle: 'Car Comparison Tool | DecideNow',
    metaDescription: 'Compare two cars with weighted scoring. Evaluate price, reliability, fuel efficiency, features, and safety to find your perfect vehicle.',
    defaultCriteria: [
      { name: 'Price', importance: 10 },
      { name: 'Reliability', importance: 9 },
      { name: 'Fuel Efficiency', importance: 8 },
      { name: 'Safety Rating', importance: 9 },
      { name: 'Features & Tech', importance: 7 },
      { name: 'Insurance Cost', importance: 6 },
      { name: 'Resale Value', importance: 5 },
      { name: 'Comfort & Space', importance: 7 },
    ],
  },
  {
    slug: 'laptop',
    name: 'Laptop / Tech',
    description: 'Compare two laptops or tech devices across performance, battery, and value.',
    icon: 'Laptop',
    metaTitle: 'Laptop Comparison Tool | DecideNow',
    metaDescription: 'Compare two laptops side by side with weighted scoring. Evaluate performance, battery life, display, weight, and price.',
    defaultCriteria: [
      { name: 'Performance / Speed', importance: 10 },
      { name: 'Price', importance: 9 },
      { name: 'Battery Life', importance: 8 },
      { name: 'Display Quality', importance: 8 },
      { name: 'Weight & Portability', importance: 7 },
      { name: 'Build Quality', importance: 7 },
      { name: 'RAM & Storage', importance: 8 },
      { name: 'Brand Support', importance: 5 },
    ],
  },
  {
    slug: 'relationship',
    name: 'Relationship Partner',
    description: 'Reflect on compatibility between two people across values, chemistry, and goals.',
    icon: 'Heart',
    metaTitle: 'Relationship Compatibility Tool | DecideNow',
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
    slug: 'clothing',
    name: 'Clothing / Fashion',
    description: 'Decide between two clothing items or outfits on style, fit, and value.',
    icon: 'Shirt',
    metaTitle: 'Clothing Comparison Tool | DecideNow',
    metaDescription: 'Can\'t decide between two outfits or clothing items? Compare them with weighted scoring on style, fit, price, and versatility.',
    defaultCriteria: [
      { name: 'Fit & Comfort', importance: 10 },
      { name: 'Style', importance: 9 },
      { name: 'Price', importance: 8 },
      { name: 'Versatility', importance: 7 },
      { name: 'Quality & Durability', importance: 8 },
      { name: 'Brand', importance: 4 },
    ],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    description: 'Pick between two restaurants based on food, price, ambience, and convenience.',
    icon: 'UtensilsCrossed',
    metaTitle: 'Restaurant Comparison Tool | DecideNow',
    metaDescription: 'Can\'t pick a restaurant? Compare two options with weighted scoring on food quality, price, ambience, and distance.',
    defaultCriteria: [
      { name: 'Food Quality', importance: 10 },
      { name: 'Price', importance: 8 },
      { name: 'Ambience', importance: 7 },
      { name: 'Distance', importance: 6 },
      { name: 'Service', importance: 7 },
      { name: 'Menu Variety', importance: 5 },
    ],
  },
  {
    slug: 'vacation',
    name: 'Vacation Destination',
    description: 'Choose between two travel destinations on cost, experience, and logistics.',
    icon: 'Plane',
    metaTitle: 'Vacation Destination Comparison Tool | DecideNow',
    metaDescription: 'Can\'t decide where to go on vacation? Compare two destinations with weighted scoring on cost, activities, weather, and travel time.',
    defaultCriteria: [
      { name: 'Total Cost', importance: 10 },
      { name: 'Activities & Experiences', importance: 9 },
      { name: 'Weather', importance: 8 },
      { name: 'Travel Time', importance: 7 },
      { name: 'Safety', importance: 9 },
      { name: 'Accommodation Quality', importance: 7 },
      { name: 'Local Food', importance: 6 },
    ],
  },
  {
    slug: 'college',
    name: 'College / University',
    description: 'Compare two universities on academics, cost, campus life, and location.',
    icon: 'GraduationCap',
    metaTitle: 'College Comparison Tool | DecideNow',
    metaDescription: 'Compare two colleges or universities with weighted scoring. Evaluate academics, tuition, campus life, location, and career outcomes.',
    defaultCriteria: [
      { name: 'Academic Reputation', importance: 10 },
      { name: 'Tuition & Aid', importance: 10 },
      { name: 'Location', importance: 8 },
      { name: 'Campus Life', importance: 7 },
      { name: 'Career Outcomes', importance: 9 },
      { name: 'Class Size', importance: 6 },
      { name: 'Campus Facilities', importance: 5 },
      { name: 'Social Scene', importance: 6 },
    ],
  },
  {
    slug: 'blank',
    name: 'Blank',
    description: 'Start from scratch with a fully custom decision and your own criteria.',
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
  return TEMPLATES.slice(0, 5)
}

export function seedDecision(template: Template): Decision {
  const now = new Date().toISOString()
  return {
    id: nanoid(10),
    title: 'Untitled Decision',
    optionAName: 'Option A',
    optionBName: 'Option B',
    templateSlug: template.slug === 'blank' ? null : template.slug,
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
