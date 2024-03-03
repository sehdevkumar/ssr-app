import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-form-values',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './update-form-values.component.html',
  styleUrl: './update-form-values.component.scss'
})
export class UpdateFormValuesComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm() {
    // Example of using patchValue to update specific form fields
    // this.form.patchValue({
    //   username: 'newUsername',
    //   email: 'newemail@example.com'
    // });

    // Example of using setValue to update all form fields
    this.form.setValue({
      username: 'newUsername',
      email: 'newemail@example.com',
      password: 'newPassword'
    });

  }
}
