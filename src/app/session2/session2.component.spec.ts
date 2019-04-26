import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Session2Component } from './session2.component';

describe('Session2Component', () => {
  let component: Session2Component;
  let fixture: ComponentFixture<Session2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Session2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Session2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
