import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsQuejasUsuPage } from './tabs-quejas-usu.page';

describe('TabsQuejasUsuPage', () => {
  let component: TabsQuejasUsuPage;
  let fixture: ComponentFixture<TabsQuejasUsuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsQuejasUsuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsQuejasUsuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
