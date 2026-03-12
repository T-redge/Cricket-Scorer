import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOverUi } from './end-over-ui';

describe('EndOverUi', () => {
  let component: EndOverUi;
  let fixture: ComponentFixture<EndOverUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndOverUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndOverUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
