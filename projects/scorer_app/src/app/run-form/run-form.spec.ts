import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunForm } from './run-form';

describe('RunForm', () => {
  let component: RunForm;
  let fixture: ComponentFixture<RunForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
