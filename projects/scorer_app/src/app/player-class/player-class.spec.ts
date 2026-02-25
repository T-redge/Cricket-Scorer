import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerClass } from './player-class';

describe('PlayerClass', () => {
  let component: PlayerClass;
  let fixture: ComponentFixture<PlayerClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerClass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
