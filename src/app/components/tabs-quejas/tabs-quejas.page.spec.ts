import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsQuejasPage } from './tabs-quejas.page';

describe('TabsQuejasPage', () => {
  let component: TabsQuejasPage;
  let fixture: ComponentFixture<TabsQuejasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsQuejasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsQuejasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
