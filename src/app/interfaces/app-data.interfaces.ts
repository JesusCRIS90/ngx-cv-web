import {
  Project,
  Experience,
  Skill,
  SkillChip,
  TextWithKeyWords,
  ImageResponsiveVersions
} from './app.interfaces'

export interface AppData {
  home: AppDataHome,
  projects: AppDataProjects,
  experience: AppDataExperience,
  skills: AppDataSkills,
  contact: AppDataContact,
}

// TODO: Add the necesary data on each interface
export interface AppDataHome{
  name: TextWithKeyWords,
  role: TextWithKeyWords,
  briefBio: TextWithKeyWords,
  profileImg: ImageResponsiveVersions,
  background: ImageResponsiveVersions,
  url_linkedin: string,
  url_github: string,
  url_downloadCV: string,
  url_email: string,
}

export interface AppDataProjects{
  projects: Project[]
}

export interface AppDataExperience{
  experience: Experience[]
}

export interface AppDataSkills{
  skills: Skill[],
  chips: SkillChip[]
}

export interface AppDataContact{}




