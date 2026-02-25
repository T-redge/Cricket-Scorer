import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleselectUi } from './roleselect-ui';

describe('RoleselectUi', () => {
  let component: RoleselectUi;
  let fixture: ComponentFixture<RoleselectUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleselectUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleselectUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
