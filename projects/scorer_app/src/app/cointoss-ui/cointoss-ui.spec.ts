import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CointossUi } from './cointoss-ui';

describe('CointossUi', () => {
  let component: CointossUi;
  let fixture: ComponentFixture<CointossUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CointossUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CointossUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
