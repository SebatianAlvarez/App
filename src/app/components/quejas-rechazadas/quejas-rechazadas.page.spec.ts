import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuejasRechazadasPage } from './quejas-rechazadas.page';

describe('QuejasRechazadasPage', () => {
  let component: QuejasRechazadasPage;
  let fixture: ComponentFixture<QuejasRechazadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuejasRechazadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuejasRechazadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
