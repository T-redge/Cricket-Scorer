import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndMatchUi } from './end-match-ui';

describe('EndMatchUi', () => {
  let component: EndMatchUi;
  let fixture: ComponentFixture<EndMatchUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndMatchUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndMatchUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
