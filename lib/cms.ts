import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

// Helper to safely read JSON files
export function getJsonData<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading JSON file ${filename}:`, error);
    throw error;
  }
}

/**
 * Safely normalizes date values parsed from frontmatter or JSON.
 * gray-matter / js-yaml automatically parses unquoted YYYY-MM-DD or ISO date strings
 * into JavaScript Date objects. This function ensures all dates returned to React components
 * are normalized to serializable strings, preventing "Objects are not valid as a React child" build errors.
 */
export function normalizeDate(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (value instanceof Date) {
    if (isNaN(value.getTime())) {
      return '';
    }
    const isoString = value.toISOString();
    return isoString.endsWith('T00:00:00.000Z') ? isoString.split('T')[0] : isoString;
  }
  return String(value);
}

// Interfaces
export interface SiteSettings {
  name: string;
  title: string;
  role: string;
  shortBio: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    bugcrowd: string;
    tryhackme: string;
  };
  seo: {
    siteName: string;
    defaultDescription: string;
    siteUrl: string;
  };
}

export interface FocusArea {
  title: string;
  description: string;
}

export interface AboutData {
  heading: string;
  bioParagraphs: string[];
  focusAreas: FocusArea[];
  philosophy: string;
  technologies: string[];
}

export interface ExperienceItem {
  id: string;
  position: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  externalLink?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  relevantCoursework: string[];
  achievements: string[];
  link?: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
  description: string;
  skills: string[];
}

export interface ProjectData {
  title: string;
  slug: string;
  category: string;
  securityType: string;
  date: string;
  featured: boolean;
  shortDescription: string;
  technologies: string[];
  featuredImage?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  documentationUrl?: string;
  content: string;
}

export interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  featuredImage?: string;
  featured?: boolean;
  content: string;
}

// Settings & Global
export function getSettings(): SiteSettings {
  return getJsonData<SiteSettings>('settings.json');
}

export function getAboutData(): AboutData {
  return getJsonData<AboutData>('about.json');
}

export function getExperience(): ExperienceItem[] {
  return getJsonData<ExperienceItem[]>('experience.json');
}

export function getEducation(): EducationItem[] {
  return getJsonData<EducationItem[]>('education.json');
}

export function getCertificates(): CertificateItem[] {
  return getJsonData<CertificateItem[]>('certificates.json');
}

// Markdown Collections: Projects
export function getAllProjects(): ProjectData[] {
  const projectsDir = path.join(contentDir, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  const fileNames = fs.readdirSync(projectsDir);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(projectsDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        title: data.title || '',
        slug: data.slug || fileName.replace(/\.md$/, ''),
        category: data.category || 'Security',
        securityType: data.securityType || 'Vulnerability Research',
        date: normalizeDate(data.date),
        featured: Boolean(data.featured),
        shortDescription: data.shortDescription || '',
        technologies: data.technologies || [],
        featuredImage: data.featuredImage || '',
        githubUrl: data.githubUrl || '',
        liveDemoUrl: data.liveDemoUrl || '',
        documentationUrl: data.documentationUrl || '',
        content,
      } as ProjectData;
    });

  return projects.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedProjects(): ProjectData[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug) || null;
}

// Markdown Collections: Blog
export function getAllBlogPosts(): BlogPostData[] {
  const blogDir = path.join(contentDir, 'blog');
  if (!fs.existsSync(blogDir)) return [];

  const fileNames = fs.readdirSync(blogDir);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(blogDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        title: data.title || '',
        slug: data.slug || fileName.replace(/\.md$/, ''),
        excerpt: data.excerpt || '',
        date: normalizeDate(data.date),
        author: data.author || 'Rahul',
        category: data.category || 'Cybersecurity',
        tags: data.tags || [],
        readingTime: data.readingTime || '5 min read',
        featuredImage: data.featuredImage || '',
        featured: Boolean(data.featured),
        content,
      } as BlogPostData;
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedBlogPosts(): BlogPostData[] {
  return getAllBlogPosts().filter((post) => post.featured);
}

export function getBlogPostBySlug(slug: string): BlogPostData | null {
  const all = getAllBlogPosts();
  return all.find((post) => post.slug === slug) || null;
}
