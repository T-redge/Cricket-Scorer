import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WicketForm } from './wicket-form';

describe('WicketForm', () => {
  let component: WicketForm;
  let fixture: ComponentFixture<WicketForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WicketForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WicketForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
