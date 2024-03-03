import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-dynamic-controls-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <form class="grid w-full h-full justify-center " [formGroup]="forms">
      <div>
        <ng-container
          formArrayName="items"
          *ngFor="let i of itemsFormArray?.controls; let ii = index"
        >
          <mat-form-field *ngIf="ii"  appearance="fill" class="flex gap-10">
            <input matInput type="text" formControlName="{{ i }}" />
            <button
              type="button"
              title="Remove Item"
              (click)="onRemoveItem(ii)"
            >
              Remove
            </button>
          </mat-form-field>
        </ng-container>
      </div>

      <button mat-raised-button (click)="onAddItem()">Add Item</button>
    </form>
  `,
  styleUrl: './dynamic-controls-form.component.scss',
})
export class DynamicControlsFormComponent {
  forms!: FormGroup<any>;
  itemsFormArray!: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.forms = this.fb.group({
      items: this.fb.array([new FormControl(null)]),
    });
    this.itemsFormArray = this.forms?.get('items') as FormArray;
  }

  onAddItem() {
    this.itemsFormArray?.controls?.push(new FormControl(null));
  }

  onRemoveItem(index: number) {
    this.itemsFormArray?.removeAt(index);
  }
}
