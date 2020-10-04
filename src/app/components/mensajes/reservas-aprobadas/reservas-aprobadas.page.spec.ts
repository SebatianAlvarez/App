import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAprobadasPage } from './reservas-aprobadas.page';

describe('ReservasAprobadasPage', () => {
  let component: ReservasAprobadasPage;
  let fixture: ComponentFixture<ReservasAprobadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasAprobadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasAprobadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
