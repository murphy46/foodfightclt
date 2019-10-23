import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCompetitionComponent } from './pie-competition.component';

describe('PieCompetitionComponent', () => {
  let component: PieCompetitionComponent;
  let fixture: ComponentFixture<PieCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieCompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
