import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSettingsForm } from './match-settings-form';

describe('MatchSettingsForm', () => {
  let component: MatchSettingsForm;
  let fixture: ComponentFixture<MatchSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchSettingsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchSettingsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
