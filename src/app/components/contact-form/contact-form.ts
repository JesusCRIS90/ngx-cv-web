import { Component, inject, OnInit, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { environment } from '../../../environments/environment';

import { ErrorMessageService, Web3FormSubmittingService } from '../../services';
import { ContactFormData, ContactFormModel } from '../../interfaces';
import { typedKeys } from '../../utils';

import { HCaptcha as HCaptchaComponent } from '../../components/h-captcha/h-captcha';

export type ContactFormState = 'idle' | 'sending' | 'success' | 'error';

const FEEDBACK_DELAY_MS = 2000;

@Component({
  selector: 'cv-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HCaptchaComponent],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {
  private formBuilder = inject(FormBuilder);

  @ViewChild('captcha', { static: true })
  captchaComponent!: HCaptchaComponent;

  formState = output<ContactFormState>();

  form!: FormGroup;
  captchaToken: string | null = null;
  isSending = false;

  ngOnInit() {
    this.form = this.createForm();
    this.emitFormState('idle');
  }

  gethCaptchaToken(): string {
    return environment.web3FormHCaptchaCommonKey;
  }

  private createForm() {
    return this.formBuilder.group<ContactFormModel>({
      name: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true,
      }),
      email: this.formBuilder.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      message: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(10)],
        nonNullable: true,
      }),
    });
  }

  submit() {
    const formControlNames = typedKeys(this.form.controls);

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      formControlNames.forEach((controlName) => {
        this.checkInput(String(controlName));
      });

      this.emitFormState('error');
      return;
    }

    if (!this.captchaToken) {
      this.captchaComponent.setError('You must verify you are human.');
      this.emitFormState('error');
      return;
    }

    this.emitFormState('sending');
    this.sendFormData();
  }

  protected async sendFormData() {
    this.isSending = true;

    try {
      const payload = {
        ...this.form.value,
        'h-captcha-response': this.captchaToken,
      };

      const formStatus =
        await Web3FormSubmittingService.Submit<ContactFormData>(payload);

      if (formStatus.ok) {
        // Trigger Ok Animation
        this.emitFormState('success');
      } else {
        // Trigger Error Animation
        this.emitFormState('error');
      }
    } catch (error) {
      console.error('Form submit error', error);
      this.emitFormState('error');
    } finally {
      this.isSending = false;
      setTimeout(() => this.resetForm(), FEEDBACK_DELAY_MS);
    }
  }

  protected checkInput(formControlName: string) {
    const formControl = this.form.get(formControlName);

    if (!formControl) return;
    if (!formControl.errors) return;

    const errorMessage = ErrorMessageService.getMessage(formControl.errors);

    formControl.setErrors({
      ...formControl.errors,
      friendlyMessage: errorMessage,
    });
  }

  protected onCaptchaVerified(token: string) {
    this.captchaToken = token;
  }

  protected resetForm() {
    this.form.reset();
    this.captchaToken = null;
    this.captchaComponent.reset();
    this.emitFormState('idle');
  }

  protected emitFormState(state: ContactFormState) {
    this.formState.emit(state);
  }
}
