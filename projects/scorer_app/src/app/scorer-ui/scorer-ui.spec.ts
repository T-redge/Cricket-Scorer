import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorerUi } from './scorer-ui';

describe('ScorerUi', () => {
  let component: ScorerUi;
  let fixture: ComponentFixture<ScorerUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorerUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorerUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
