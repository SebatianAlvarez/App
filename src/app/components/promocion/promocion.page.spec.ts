import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionPage } from './promocion.page';

describe('PromocionPage', () => {
  let component: PromocionPage;
  let fixture: ComponentFixture<PromocionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
