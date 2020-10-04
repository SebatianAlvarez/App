import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDesayunoPage } from './menu-desayuno.page';

describe('MenuDesayunoPage', () => {
  let component: MenuDesayunoPage;
  let fixture: ComponentFixture<MenuDesayunoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDesayunoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDesayunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
