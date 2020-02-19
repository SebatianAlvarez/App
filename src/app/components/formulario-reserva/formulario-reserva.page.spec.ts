import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservaPage } from './formulario-reserva.page';

describe('FormularioReservaPage', () => {
  let component: FormularioReservaPage;
  let fixture: ComponentFixture<FormularioReservaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioReservaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
