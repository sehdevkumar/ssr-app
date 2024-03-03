import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-dynamic-controls-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <form [formGroup]="forms">
      <ng-container
        formArrayName="items"
        *ngFor="let i of itemsFormArray.controls; let ii = index"
      >
        <mat-form-field *ngIf="ii">
          <input type="text" formControlName="{{ i }}" />
          <button type="button" title="Remove Item" (click)="onRemoveItem(ii)">
            Remove
          </button>
        </mat-form-field>
      </ng-container>
    </form>
  `,
  styleUrl: './dynamic-controls-form.component.scss',
})
export class DynamicControlsFormComponent {
  forms!: FormGroup<any>;
  itemsFormArray!: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.forms = this.fb.group({
      items: this.fb.array([new FormControl(null)]),
    });
    this.itemsFormArray = this.forms.get('items') as FormArray;
  }

  onAddItem() {
    this.itemsFormArray.push(new FormControl(null));
  }

  onRemoveItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }
}
