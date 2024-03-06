import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Child21Component } from './child21.component';

describe('Child21Component', () => {
  let component: Child21Component;
  let fixture: ComponentFixture<Child21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Child21Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Child21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
