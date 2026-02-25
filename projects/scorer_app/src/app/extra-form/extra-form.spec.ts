import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraForm } from './extra-form';

describe('ExtraForm', () => {
  let component: ExtraForm;
  let fixture: ComponentFixture<ExtraForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
