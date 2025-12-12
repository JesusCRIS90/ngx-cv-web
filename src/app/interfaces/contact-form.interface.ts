import { FormControl } from "@angular/forms";

export interface ContactFormModel {
  name: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
}

// For Formspark Submit
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}