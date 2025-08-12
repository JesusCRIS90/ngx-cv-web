export interface SkillCard {
  name: string,
  topic: string,
  tag: string,
  refIconName: string,
}

export interface TimeLineCard {
  icon: string,
  role: string,
  timeSpan: string,
  company: string,
  description: string,
  type: 'education' | 'experience'
}

export interface Experience {
  role: string,
  company: string,
  timeSpan: string,
  mdDescription: string,
  techs: Technology[],
}

export interface Projects {
  title: string,
  type: ProjectMedia,
  imageUrls: string[],
  videoUrl: string,
  techs: Technology[],
  links: Link[],
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

export type ProjectMedia = 'img' | 'video';
