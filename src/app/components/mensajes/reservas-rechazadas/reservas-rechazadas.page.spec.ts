import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasRechazadasPage } from './reservas-rechazadas.page';

describe('ReservasRechazadasPage', () => {
  let component: ReservasRechazadasPage;
  let fixture: ComponentFixture<ReservasRechazadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasRechazadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasRechazadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
