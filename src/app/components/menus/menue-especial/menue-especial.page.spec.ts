import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenueEspecialPage } from './menue-especial.page';

describe('MenueEspecialPage', () => {
  let component: MenueEspecialPage;
  let fixture: ComponentFixture<MenueEspecialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenueEspecialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenueEspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
