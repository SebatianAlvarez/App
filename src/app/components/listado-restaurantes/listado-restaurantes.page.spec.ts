import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRestaurantesPage } from './listado-restaurantes.page';

describe('ListadoRestaurantesPage', () => {
  let component: ListadoRestaurantesPage;
  let fixture: ComponentFixture<ListadoRestaurantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoRestaurantesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
