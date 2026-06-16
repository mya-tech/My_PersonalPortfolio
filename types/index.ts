// types/index.ts

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string          // Short (used on cards)
  story: string                // Long-form (used on project page)
  techStack: string[]
  screenshots: string[]        // Paths under /public/images/projects/[slug]/
  videoUrl?: string            // YouTube or Loom embed URL
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  bullets: string[]
  type: 'coop' | 'research' | 'freelance' | 'founder'
}

export interface Skill {
  category: string
  items: string[]
}

export interface Achievement {
  title: string
  subtitle: string
  year: string
  icon: string                 // Lucide icon name
}

export interface Cat {
  id: string
  name: string
  role: string
  baseId: string               // e.g. "cat-1"
  accessoryIds: string[]       // e.g. ["hat-beret", "laptop"]
  createdAt: string
}

export interface CatAsset {
  id: string
  label: string
  imagePath: string
  category: 'base' | 'hat' | 'item'
}
