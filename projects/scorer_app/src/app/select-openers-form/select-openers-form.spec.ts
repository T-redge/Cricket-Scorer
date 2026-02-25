import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOpenersForm } from './select-openers-form';

describe('SelectOpenersForm', () => {
  let component: SelectOpenersForm;
  let fixture: ComponentFixture<SelectOpenersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOpenersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOpenersForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
