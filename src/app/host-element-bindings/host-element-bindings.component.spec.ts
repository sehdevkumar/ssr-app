import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostElementBindingsComponent } from './host-element-bindings.component';

describe('HostElementBindingsComponent', () => {
  let component: HostElementBindingsComponent;
  let fixture: ComponentFixture<HostElementBindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostElementBindingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostElementBindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
