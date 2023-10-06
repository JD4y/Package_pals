import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevicerComponent } from './revicer.component';

describe('RevicerComponent', () => {
  let component: RevicerComponent;
  let fixture: ComponentFixture<RevicerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevicerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
