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
      home:       AppDataMapper.normalizeHomeData(jsonData),
      projects:   AppDataMapper.normalizeProjectsData(jsonData),
      experience: AppDataMapper.normalizeExperienceData(jsonData),
      skills:     AppDataMapper.normalizeSkillsData(jsonData),
      contact:    AppDataMapper.normalizeContactData(jsonData),
    };

    return data;
  }

  private static normalizeHomeData(jsonData: unknown): AppDataHome {
    const data: AppDataHome = {}

    // TODO: Here the respective adaptation

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
