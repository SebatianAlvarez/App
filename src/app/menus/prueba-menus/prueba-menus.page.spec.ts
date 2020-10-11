import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMenusPage } from './prueba-menus.page';

describe('PruebaMenusPage', () => {
  let component: PruebaMenusPage;
  let fixture: ComponentFixture<PruebaMenusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaMenusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaMenusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
