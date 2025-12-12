import { ValidationErrors } from "@angular/forms";

export class ErrorMessageService {
  static getMessage(errors: ValidationErrors): string {
    if (!errors) return '';

    if (errors['required']) {
      return 'This field is required.';
    }

    if (errors['email']) {
      return 'Enter a valid email address.';
    }

    if (errors['minlength']) {
      const required = errors['minlength'].requiredLength;
      return `Minimum length is ${required} characters.`;
    }

    if (errors['maxlength']) {
      const required = errors['maxlength'].requiredLength;
      return `Maximum length allowed is ${required} characters.`;
    }

    // fallback
    return 'Invalid field.';
  }
}