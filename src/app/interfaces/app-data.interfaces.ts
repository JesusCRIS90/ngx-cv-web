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
export interface AppDataProjects{}
export interface AppDataExperience{}
export interface AppDataSkills{}
export interface AppDataContact{}


interface TextWithKeyWords {
  text: string,
  keywords: string[]
}

interface ImageResponsiveVersions {
  hori: string,
  vert: string,
}
