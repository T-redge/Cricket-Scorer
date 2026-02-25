import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBtns } from './event-btns';

describe('EventBtns', () => {
  let component: EventBtns;
  let fixture: ComponentFixture<EventBtns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventBtns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventBtns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
