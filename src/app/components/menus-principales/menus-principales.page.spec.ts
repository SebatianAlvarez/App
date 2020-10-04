import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusPrincipalesPage } from './menus-principales.page';

describe('MenusPrincipalesPage', () => {
  let component: MenusPrincipalesPage;
  let fixture: ComponentFixture<MenusPrincipalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusPrincipalesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusPrincipalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
