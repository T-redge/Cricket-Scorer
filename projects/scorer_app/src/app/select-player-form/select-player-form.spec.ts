import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlayerForm } from './select-player-form';

describe('SelectPlayerForm', () => {
  let component: SelectPlayerForm;
  let fixture: ComponentFixture<SelectPlayerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlayerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlayerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
