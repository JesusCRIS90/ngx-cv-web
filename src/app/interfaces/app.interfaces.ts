export type ProjectMedia = 'img' | 'video';
export type ExperienceType = 'experience' | 'education';


export interface ShortProjectCard {
  id: string,
  title: string,
  briefBio: string,
  imageUrls: string[],
}

export interface LongProjectCard {
  title: string,
  mdDescription: string,
  type: ProjectMedia,
  imageUrls: string[],
  videoUrl: string,
  techs: Technology[],
  links: Link[],
}

export interface TimeLineCard {
  id: string,
  icon: string,
  role: string,
  timeSpan: string,
  company: string,
  description: string,
  type: ExperienceType
}

export interface LongExperienceCard {
  role: string,
  company: string,
  timeSpan: string,
  mdDescription: string,
  techs: Technology[],
}

export interface SkillCard {
  name: string,
  topic: string,
  tag: string,
  refIconName: string,
}

// ------------------------------------------

export interface Project {
  id: string,
  title: string,
  briefBio: string,
  mdDescription: string,
  type: ProjectMedia,
  imageUrls: ImageResponsiveVersions[],
  videoUrl: string,
  techs: Technology[],
  links: Link[],
}

export interface Experience {
  id: string,
  role: string,
  company: string,
  timeSpan: string,
  mdDescription: string,
  description: string,
  techs: Technology[],
  type: ExperienceType
}

export interface Skill {
  name: string,
  topic: string,
  tag: string[],
  refIconName: string,
}

export interface SkillChip {
  topic: string,
  tag: string,
}

export interface Technology {
  name: string,
  icon: string,
  tooltip: string,
}

export interface Link {
  name: string,
  icon: string,
  url: string,
  tooltip: string,
}

export interface TextWithKeyWords {
  text: string,
  keywords: string[]
}

export interface ImageResponsiveVersions {
  hori: string,
  vert: string,
}

