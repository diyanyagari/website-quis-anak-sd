import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Session4Component } from './session4.component';

describe('Session4Component', () => {
  let component: Session4Component;
  let fixture: ComponentFixture<Session4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Session4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Session4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
