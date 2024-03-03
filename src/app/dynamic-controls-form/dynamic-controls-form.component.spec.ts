import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicControlsFormComponent } from './dynamic-controls-form.component';

describe('DynamicControlsFormComponent', () => {
  let component: DynamicControlsFormComponent;
  let fixture: ComponentFixture<DynamicControlsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicControlsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicControlsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
