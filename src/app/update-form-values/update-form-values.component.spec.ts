import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormValuesComponent } from './update-form-values.component';

describe('UpdateFormValuesComponent', () => {
  let component: UpdateFormValuesComponent;
  let fixture: ComponentFixture<UpdateFormValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFormValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFormValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
