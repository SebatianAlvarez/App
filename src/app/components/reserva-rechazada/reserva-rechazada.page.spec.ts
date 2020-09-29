import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaRechazadaPage } from './reserva-rechazada.page';

describe('ReservaRechazadaPage', () => {
  let component: ReservaRechazadaPage;
  let fixture: ComponentFixture<ReservaRechazadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaRechazadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaRechazadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
