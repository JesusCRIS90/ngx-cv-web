import { Component, signal } from '@angular/core';

import {
  ResponsiveCardGridLayoutComponent as ResponsiveCardGrid,
  CardLayoutComponent as CardLayout,
  GroupDirective,
  ItemDirective,
  HorizontalLayoutComponent as HoriFlex
} from '@beexy/ngx-layouts'

import {
  BeeChipComponent as Chip
} from '@beexy/ngx-components'

import { SkillCardComponent } from '../../components'
import { SkillCard } from '../../interfaces';

const skills: SkillCard[] = [
  {
    name: 'TypeScript',
    topic: 'Programming Language',
    tag: 'p-language',
    refIconName: 'bicon-tech-typescript'
  },
  {
    name: 'Python',
    topic: 'Programming Language',
    tag: 'p-language',
    refIconName: 'bicon-tech-python'
  },
  {
    name: 'C++',
    topic: 'Programming Language',
    tag: 'p-language',
    refIconName: 'bicon-tech-cpp'
  },
  {
    name: 'Angular',
    topic: 'Frontend',
    tag: 'softLibs',
    refIconName: 'bicon-tech-angular'
  },
  {
    name: 'NestJS',
    topic: 'Backend',
    tag: 'softLibs',
    refIconName: 'bicon-tech-nestjs'
  },
  {
    name: 'MongoDB',
    topic: 'DataBase',
    tag: 'db',
    refIconName: 'bicon-tech-mongodb'
  },
  {
    name: 'Git',
    topic: 'Control Version',
    tag: 'con-ver',
    refIconName: 'bicon-tech-git'
  },
]

@Component({
  selector: 'sec-skills',
  imports: [Chip, SkillCardComponent, CardLayout, ResponsiveCardGrid, HoriFlex, GroupDirective, ItemDirective],
  templateUrl: './skills-section.component.html',
})
export class SkillsSectionComponent {

  compSkills: SkillCard[] = skills;
  skills2Show = signal<SkillCard[]>(skills);
  activeTag: string = 'all'

  protected showingSelected(selected: string[]) {
    // console.log(selected);
    let tag = '';
    // let tag = 'all';
    if (selected.length !== 0) {
      tag = selected[0]
    }
    this.activeTag = tag;
    this.filterSkillsByTag(tag);
  }

  protected filterSkillsByTag(tag: string) {
    // Case Tag === 'all'
    if (tag === 'all') {
      this.skills2Show.set(this.compSkills);
      return;
    }
    // Other Case - Filter using tag
    const newSkillsList = this.compSkills.filter((skill) => skill.tag === tag);
    this.skills2Show.set(newSkillsList);
  }

  protected getActiveTag(): string {
    return this.activeTag;
  }
}

