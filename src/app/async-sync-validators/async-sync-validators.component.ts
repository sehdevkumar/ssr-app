import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'

@Component({
  selector: 'app-async-sync-validators',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './async-sync-validators.component.html',
  styleUrl: './async-sync-validators.component.scss'
})
export class AsyncSyncValidatorsComponent {
 form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)], CustomValidators.checkUsernameAvailability],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted successfully!');
      console.log(this.form.value);
    } else {
      console.log('Form has errors!');
    }
  }
}
