import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndInningUi } from './end-inning-ui';

describe('EndInningUi', () => {
  let component: EndInningUi;
  let fixture: ComponentFixture<EndInningUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndInningUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndInningUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
