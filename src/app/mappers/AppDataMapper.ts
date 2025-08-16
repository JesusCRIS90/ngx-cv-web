import {
  AppData,
  AppDataHome,
  AppDataProjects,
  AppDataExperience,
  AppDataSkills,
  AppDataContact,
  ProjectMedia,
  ExperienceType,
  Project,
  Experience,
  Skill,
  SkillChip,
  ImageResponsiveVersions,
  TimeLineCard,
  LongExperienceCard
} from '../interfaces'


export class AppDataMapper {

  public static normalizeData(jsonData: unknown): AppData {

    const data: AppData = {
      home: AppDataMapper.normalizeHomeData(jsonData),
      projects: AppDataMapper.normalizeProjectsData(jsonData),
      experience: AppDataMapper.normalizeExperienceData(jsonData),
      skills: AppDataMapper.normalizeSkillsData(jsonData),
      contact: AppDataMapper.normalizeContactData(jsonData),
    };

    return data;
  }

  public static AppData2Skills(data: AppData | null): Skill[] {
    if (data === null) return [];
    return data.skills.skills;
  }

  public static AppData2SkillChips(data: AppData | null): SkillChip[] {
    if (data === null) return [];
    return data.skills.chips;
  }

  public static AppData2Experience(data: AppData | null): Experience[] {
    if (data === null) return [];
    return data.experience.experience;
  }

  public static ExperienceArray2TimeLineCardArray(data: Experience[]): TimeLineCard[] {
    const timelinesCards: TimeLineCard[] = [];
    data.forEach((exp) => timelinesCards.push(AppDataMapper.Experience2TimeLineCard(exp)))
    return timelinesCards;
  }

  public static ExperienceArray2LongExperienceCard(data: Experience[]): LongExperienceCard[] {
    const longCards: LongExperienceCard[] = [];
    data.forEach((exp) => longCards.push(AppDataMapper.Experience2LongExperienceCard(exp)))
    return longCards;
  }

  protected static Experience2TimeLineCard(data: Experience): TimeLineCard {
    return {
      id: data.id,
      role: data.role,
      company: data.company,
      timeSpan: data.timeSpan,
      description: data.description,
      type: data.type,
      icon: AppDataMapper.getExperienceIcon(data.type)
    }
  }

  public static Experience2LongExperienceCard(data: Experience): LongExperienceCard {
    return {
      role: data.role,
      company: data.company,
      timeSpan: data.timeSpan,
      mdDescription: data.mdDescription,
      techs: data.techs
    }
  }

  // ------------------------------------------------------------------------------

  private static normalizeHomeData(jsonData: unknown): AppDataHome {

    const dataObj = typeof jsonData === 'object' && jsonData !== null ? jsonData as any : {};

    // console.log( "Home Data Adaptation", dataObj )

    const data: AppDataHome = {
      name: {
        text: dataObj?.Home?.name?.text ?? 'No Defined',
        keywords: dataObj.Home?.name?.keywords ?? [],
      },
      role: {
        text: dataObj?.Home?.role?.text ?? 'No Defined',
        keywords: dataObj?.Home?.role?.keywords ?? [],
      },
      briefBio: {
        text: dataObj?.Home?.briefBio?.text ?? 'No Defined',
        keywords: dataObj?.Home?.briefBio?.keywords ?? [],
      },
      profileImg: {
        vert: dataObj?.Home?.profileImage?.vertical ?? '',
        hori: dataObj?.Home?.profileImage?.horizontal ?? '',
      },
      background: {
        vert: dataObj?.Home?.background?.vertical ?? '',
        hori: dataObj?.Home?.background?.horizontal ?? '',
      },
      url_linkedin: dataObj?.Home?.linkedin_url ?? '',
      url_github: dataObj?.Home?.github_url ?? '',
      url_downloadCV: dataObj?.Home?.downloable_cv_url ?? '',
      url_email: dataObj?.Home?.da_email ?? '',
    }

    return data;
  }

  private static normalizeProjectsData(jsonData: unknown): AppDataProjects {

    const dataObj = typeof jsonData === 'object' && jsonData !== null ? jsonData as any : {};

    const projects: Project[] = Array.isArray(dataObj.SProjects)
      ? dataObj.SProjects.map((p: any) => ({
        id: AppDataMapper.isString(p?.id) ? p.id.trim() : '',
        title: AppDataMapper.isString(p?.title) ? p.title.trim() : '',
        briefBio: AppDataMapper.isString(p?.briefBio) ? p.briefBio.trim() : '',
        mdDescription: AppDataMapper.isString(p?.mdDescription) ? p.mdDescription.trim() : '',
        type: AppDataMapper.isProjectMedia(p?.type) ? p.type : 'img',
        imageUrls: AppDataMapper.isObjectType(p?.imageUrls) ? AppDataMapper.normalizeImagesUrls(p.imageUrls) : [],
        videoUrl: AppDataMapper.isString(p?.videoUrl) ? p.videoUrl.trim() : '',
        techs: Array.isArray(p?.techs) ? AppDataMapper.normalizeTechs(p.techs) : [],
        links: Array.isArray(p?.links) ? AppDataMapper.normalizeLinks(p.links) : []
      }))
      : [];

    return { projects };
  }

  private static normalizeExperienceData(jsonData: unknown): AppDataExperience {

    const dataObj = typeof jsonData === 'object' && jsonData !== null ? jsonData as any : {};

    const experience: Experience[] = Array.isArray(dataObj.SExperience)
      ? dataObj.SExperience.map((e: any) => ({
        id: AppDataMapper.isString(e?.id) ? e.id.trim() : '',
        role: AppDataMapper.isString(e?.role) ? e.role.trim() : '',
        company: AppDataMapper.isString(e?.company) ? e.company.trim() : '',
        timeSpan: AppDataMapper.isString(e?.timeSpan) ? e.timeSpan.trim() : '',
        mdDescription: AppDataMapper.isString(e?.mdDescription) ? e.mdDescription.trim() : '',
        description: AppDataMapper.isString(e?.briefDescription) ? e.briefDescription.trim() : '',
        techs: Array.isArray(e?.techs) ? AppDataMapper.normalizeTechs(e.techs) : [],
        type: AppDataMapper.isExperienceType(e?.type) ? e.type : 'experience'
      }))
      : [];

    return { experience };
  }

  private static normalizeSkillsData(jsonData: unknown): AppDataSkills {

    const dataObj = typeof jsonData === 'object' && jsonData !== null ? jsonData as any : {};

    const skills: Skill[] = Array.isArray(dataObj?.SSkills?.skills)
      ? AppDataMapper.normalizeSkills(dataObj.SSkills.skills) : [];

    const chips: SkillChip[] = Array.isArray(dataObj?.SSkills?.chips)
      ? AppDataMapper.normalizeChips(dataObj.SSkills.chips) : [];

    return { skills, chips };
  }

  private static normalizeContactData(jsonData: unknown): AppDataContact {
    const data: AppDataContact = {}

    // TODO: Here the respective adaptation

    return data;
  }

  private static isObjectType(input: any): boolean {
    return typeof input === 'object';
  }

  private static isString(input: any): boolean { return typeof input === 'string'; }

  private static isProjectMedia(value: any): value is ProjectMedia {
    return value === 'img' || value === 'video';
  }

  private static isExperienceType(value: any): value is ExperienceType {
    return value === 'experience' || value === 'education';
  }

  private static normalizeLinks(links: any[]) {

    const adaptedLinks =
      links
        .filter((link: any) => typeof link === 'object' && link !== null)
        .map((link: any) => ({
          name: AppDataMapper.isString(link?.name) ? link.name.trim() : '',
          icon: AppDataMapper.isString(link?.icon) ? link.icon.trim() : '',
          url: AppDataMapper.isString(link?.url) ? link.url.trim() : '',
          tooltip: AppDataMapper.isString(link?.tooltip) ? link.tooltip.trim() : ''
        }));

    return adaptedLinks;
  }

  private static normalizeTechs(techs: any[]) {

    const adaptedTechs =
      techs
        .filter((tech: any) => typeof tech === 'object' && tech !== null)
        .map((tech: any) => ({
          name: AppDataMapper.isString(tech?.name) ? tech.name.trim() : '',
          icon: AppDataMapper.isString(tech?.icon) ? tech.icon.trim() : '',
          tooltip: AppDataMapper.isString(tech?.tooltip) ? tech.tooltip.trim() : ''
        }))

    return adaptedTechs;
  }

  private static normalizeUrls(images: any[]) {

    const adaptedImagesUrls =
      images
        .filter((u: any) => typeof u === 'string')
        .map((u: string) => u.trim());

    return adaptedImagesUrls;
  }

  private static normalizeImagesUrls(images: any): ImageResponsiveVersions[] {

    // Ensure it's an object with hori and vert arrays
    const horiArr = Array.isArray(images?.hori)
      ? images.hori.filter((u: any) => typeof u === 'string').map((u: string) => u.trim())
      : [];

    const vertArr = Array.isArray(images?.vert)
      ? images.vert.filter((u: any) => typeof u === 'string').map((u: string) => u.trim())
      : [];

    // Pair elements by index; if one array is shorter, fill with ''
    const length = Math.max(horiArr.length, vertArr.length);

    const result: ImageResponsiveVersions[] = [];
    for (let i = 0; i < length; i++) {
      result.push({
        hori: horiArr[i] ?? '',
        vert: vertArr[i] ?? ''
      });
    }

    return result;
  }

  private static normalizeTags(tags: any[]) {

    const adaptedTags =
      tags
        .filter((tag: any) => typeof tag === 'string')
        .map((tag: string) => tag.trim())

    return adaptedTags;
  }

  private static normalizeChips(chips: any[]) {

    const adaptedChips =
      chips
        .filter((chip: any) => typeof chip === 'object' && chip !== null)
        .map((chip: any) => ({
          topic: AppDataMapper.isString(chip?.topic) ? chip.topic.trim() : '',
          tag: AppDataMapper.isString(chip?.tag) ? chip.tag.trim() : ''
        }))

    return adaptedChips;
  }

  private static normalizeSkills(skills: any[]) {

    const adaptedSkills =
      skills
        .filter((skill: any) => typeof skill === 'object' && skill !== null)
        .map((skill: any) => ({
          name: AppDataMapper.isString(skill?.name) ? skill.name.trim() : '',
          topic: AppDataMapper.isString(skill?.topic) ? skill.topic.trim() : '',
          tag: Array.isArray(skill?.tag) ? AppDataMapper.normalizeTags(skill.tag) : [],
          refIconName: AppDataMapper.isString(skill?.refIcon) ? skill.refIcon.trim() : ''
        }))

    return adaptedSkills;
  }

  private static getExperienceIcon(type: ExperienceType): string {
    return type === 'experience' ? 'bicon-common-experience' : 'bicon-common-education';
  }
}



// private static normalizeProjectsData(jsonData: unknown): AppDataProjects {
//   const data: AppDataProjects = {}

//   // const dataObj = typeof jsonData === 'object' && jsonData !== null ? jsonData as any : {};

//   // TODO: Here the respective adaptation

//   return data;
// }

// private static normalizeSkillsData(jsonData: unknown): AppDataSkills {
//   const data: AppDataSkills = {}

//   // TODO: Here the respective adaptation

//   return data;
// }

// private static normalizeExperienceData(jsonData: unknown): AppDataExperience {
//   const data: AppDataExperience = {}

//   // TODO: Here the respective adaptation

//   return data;
// }
