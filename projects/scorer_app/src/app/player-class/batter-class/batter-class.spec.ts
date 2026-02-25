import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterClass } from './batter-class';

describe('BatterClass', () => {
  let component: BatterClass;
  let fixture: ComponentFixture<BatterClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatterClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterClass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
