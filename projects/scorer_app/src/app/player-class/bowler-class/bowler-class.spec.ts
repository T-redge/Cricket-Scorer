import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlerClass } from './bowler-class';

describe('BowlerClass', () => {
  let component: BowlerClass;
  let fixture: ComponentFixture<BowlerClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BowlerClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowlerClass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
