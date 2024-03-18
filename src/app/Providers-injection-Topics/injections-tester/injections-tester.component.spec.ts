import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionsTesterComponent } from './injections-tester.component';

describe('InjectionsTesterComponent', () => {
  let component: InjectionsTesterComponent;
  let fixture: ComponentFixture<InjectionsTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InjectionsTesterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InjectionsTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
