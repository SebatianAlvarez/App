import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPromocionesHabilitadasPage } from './lista-promociones-habilitadas.page';

describe('ListaPromocionesHabilitadasPage', () => {
  let component: ListaPromocionesHabilitadasPage;
  let fixture: ComponentFixture<ListaPromocionesHabilitadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPromocionesHabilitadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPromocionesHabilitadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
