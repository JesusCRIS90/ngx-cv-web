import { Inject, Injectable, Optional } from '@angular/core';
import { BodyClassManager } from './body-class-manager'

import { COLOR_SCHEMA_CONFIG_TOKEN, ColorSchemaConfig } from '../color'


@Injectable({
  providedIn: 'root',
})
export class ColorSchemaService {
  private prefix: string = 'color-schema-';
  private availableSchemas: string[] = ['default'];
  private currentSchema: string | null = null;

  constructor(
    @Optional() @Inject(COLOR_SCHEMA_CONFIG_TOKEN) config?: ColorSchemaConfig
  ) {
    if (config === undefined) return;

    this.prefix = config?.prefix;
    this.availableSchemas = config?.availableSchemas;
  }

  // -------- Schema Switching --------
  setSchema(schemaName: string): void {
    if (!this.availableSchemas.includes(schemaName)) {
      console.warn(`Color schema '${schemaName}' is not registered.`);
      return;
    }

    const newClass = this.prefix + schemaName;
    if (this.currentSchema) {
      const oldClass = this.prefix + this.currentSchema;
      BodyClassManager.updateClass(oldClass, newClass);
    } else {
      BodyClassManager.addClass(newClass);
    }

    this.currentSchema = schemaName;
  }

  clearSchema(): void {
    BodyClassManager.clearClassesWithPrefix(this.prefix);
    this.currentSchema = null;
  }

  // -------- Getters --------
  getAvailableSchemas(): string[] {
    return this.availableSchemas;
  }

  getCurrentSchema(): string | null {
    return this.currentSchema;
  }

  getPrefix(): string {
    return this.prefix;
  }

  // -------- Setters --------
  setAvailableSchemas(schemas: string[]): void {
    this.availableSchemas = schemas;
  }

  setPrefix(newPrefix: string): void {
    if (this.currentSchema) {
      const oldClass = this.prefix + this.currentSchema;
      BodyClassManager.removeClass(oldClass);
      const newClass = newPrefix + this.currentSchema;
      BodyClassManager.addClass(newClass);
    }
    this.prefix = newPrefix;
  }
}
