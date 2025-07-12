export class BodyClassManager {

  static addClass(className: string): void {
    document.body.classList.add(className);
  }

  static removeClass(className: string): void {
    if( BodyClassManager.hasClass( className ) )
      document.body.classList.remove(className);
  }

  static updateClass(oldClass: string, newClass: string): void {
    if( BodyClassManager.hasClass( oldClass ) ){
      document.body.classList.replace(oldClass, newClass);
    } else {
      BodyClassManager.addClass( newClass );
    }
  }

  static hasClass(className: string): boolean {
    return document.body.classList.contains(className);
  }

  static clearColorSchemaClasses(prefix: string = 'color-schema-'): void {
    const classesToRemove = Array.from(document.body.classList).filter((cls) =>
      cls.startsWith(prefix)
    );
    classesToRemove.forEach(cls => document.body.classList.remove(cls));
  }
}
