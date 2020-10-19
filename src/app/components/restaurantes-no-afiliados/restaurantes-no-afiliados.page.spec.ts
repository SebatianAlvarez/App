import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesNoAfiliadosPage } from './restaurantes-no-afiliados.page';

describe('RestaurantesNoAfiliadosPage', () => {
  let component: RestaurantesNoAfiliadosPage;
  let fixture: ComponentFixture<RestaurantesNoAfiliadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantesNoAfiliadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantesNoAfiliadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
