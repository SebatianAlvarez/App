import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsRestaurantesAfiliadosPage } from './tabs-restaurantes-afiliados.page';

describe('TabsRestaurantesAfiliadosPage', () => {
  let component: TabsRestaurantesAfiliadosPage;
  let fixture: ComponentFixture<TabsRestaurantesAfiliadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsRestaurantesAfiliadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsRestaurantesAfiliadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
