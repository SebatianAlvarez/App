import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuejasPendiUsuPage } from './quejas-pendi-usu.page';

describe('QuejasPendiUsuPage', () => {
  let component: QuejasPendiUsuPage;
  let fixture: ComponentFixture<QuejasPendiUsuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuejasPendiUsuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuejasPendiUsuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
