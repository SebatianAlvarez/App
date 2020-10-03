import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMenusPage } from './lista-menus.page';

describe('ListaMenusPage', () => {
  let component: ListaMenusPage;
  let fixture: ComponentFixture<ListaMenusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMenusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMenusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
