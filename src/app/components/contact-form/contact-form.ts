import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'cv-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {
  private formBuilder = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.createForm();
  }

  private createForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submit() {
    const formControlNames = typedKeys(this.form.controls);
    console.log(formControlNames);

    if (this.form.invalid) {
      console.log('Invalid Data');
      this.form.markAllAsTouched();

      formControlNames.forEach((controlName) => {
        this.checkInput(String(controlName));
      });

      return;
    }

    console.log('Form submitted:', this.form.value);
    alert('Message sent!');
    this.form.reset();
  }

  checkInput(formControlName: string) {
    const formControl = this.form.get(formControlName);

    if (!formControl) return;
    if (!formControl.errors) return;

    const errorMessage = ErrorMessageService.getMessage(formControl.errors);

    formControl.setErrors({
      ...formControl.errors,
      friendlyMessage: errorMessage,
    });
  }
}

function typedKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

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
