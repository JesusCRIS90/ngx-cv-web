import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { environment } from '../../../environments/environment';

import { ErrorMessageService, Web3FormSubmittingService } from '../../services'
import { ContactFormData, ContactFormModel } from '../../interfaces';
import { typedKeys } from '../../utils'

import { HcaptchaComponent } from '../../components';

@Component({
  selector: 'cv-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HcaptchaComponent],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {
  private formBuilder = inject(FormBuilder);

  @ViewChild('captcha', { static: true }) captchaContainer!: ElementRef<HcaptchaComponent>;

  form!: FormGroup;
  captchaToken: string | null = null;
  isSending = false;

  ngOnInit() {
    this.form = this.createForm();
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
      return;
    }

    if (!this.captchaToken) {
      alert('Please complete the captcha');
      return;
    }

    this.sendFormData();
  }

  async sendFormData() {
    this.isSending = true;

    // 2. append to the request
    const payload = {
      ...this.form.value,
      'h-captcha-response': this.captchaToken,
    };

    const formStatus = await Web3FormSubmittingService.Submit<ContactFormData>(
      payload
    );

    this.isSending = false;

    if (formStatus.ok) {
      // Trigger Ok Animation
      alert('Message sent!');
    } else {
      // Trigger Error Animation
      alert('Something went wrong. Try again later.');
    }

    this.resetForm();
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

  onCaptchaVerified(token: string) {
    this.captchaToken = token;
  }

  resetForm() {
    this.form.reset();
    this.captchaToken = '';
    this.captchaContainer.nativeElement.reset();
  }
}
