import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominateFormComponent } from './nominate-form.component';

describe('NominateFormComponent', () => {
  let component: NominateFormComponent;
  let fixture: ComponentFixture<NominateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
