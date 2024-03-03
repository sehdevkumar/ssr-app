import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncSyncValidatorsComponent } from './async-sync-validators.component';

describe('AsyncSyncValidatorsComponent', () => {
  let component: AsyncSyncValidatorsComponent;
  let fixture: ComponentFixture<AsyncSyncValidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncSyncValidatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsyncSyncValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
