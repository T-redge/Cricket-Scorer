import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryUi } from './delivery-ui';

describe('DeliveryUi', () => {
  let component: DeliveryUi;
  let fixture: ComponentFixture<DeliveryUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
