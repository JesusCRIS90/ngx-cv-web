import {
  AppData,
  AppDataHome,
  AppDataProjects,
  AppDataExperience,
  AppDataSkills,
  AppDataContact
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
    const data: AppDataProjects = {}

    // TODO: Here the respective adaptation

    return data;
  }

  private static normalizeExperienceData(jsonData: unknown): AppDataExperience {
    const data: AppDataExperience = {}

    // TODO: Here the respective adaptation

    return data;
  }

  private static normalizeSkillsData(jsonData: unknown): AppDataSkills {
    const data: AppDataSkills = {}

    // TODO: Here the respective adaptation

    return data;
  }

  private static normalizeContactData(jsonData: unknown): AppDataContact {
    const data: AppDataContact = {}

    // TODO: Here the respective adaptation

    return data;
  }
}
