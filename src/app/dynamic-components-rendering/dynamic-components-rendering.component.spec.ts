import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentsRenderingComponent } from './dynamic-components-rendering.component';

describe('DynamicComponentsRenderingComponent', () => {
  let component: DynamicComponentsRenderingComponent;
  let fixture: ComponentFixture<DynamicComponentsRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicComponentsRenderingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicComponentsRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
