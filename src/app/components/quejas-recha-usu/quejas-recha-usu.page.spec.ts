import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuejasRechaUsuPage } from './quejas-recha-usu.page';

describe('QuejasRechaUsuPage', () => {
  let component: QuejasRechaUsuPage;
  let fixture: ComponentFixture<QuejasRechaUsuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuejasRechaUsuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuejasRechaUsuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
