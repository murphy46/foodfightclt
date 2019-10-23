import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumoComponent } from './sumo.component';

describe('SumoComponent', () => {
    let component: SumoComponent;
    let fixture: ComponentFixture<SumoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ SumoComponent ]
        })
        .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(SumoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });

});