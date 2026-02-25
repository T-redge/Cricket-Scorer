import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamlistUi } from './teamlist-ui';

describe('TeamlistUi', () => {
  let component: TeamlistUi;
  let fixture: ComponentFixture<TeamlistUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamlistUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamlistUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
