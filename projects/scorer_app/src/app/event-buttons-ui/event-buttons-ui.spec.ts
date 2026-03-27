import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventButtonsUi } from './event-buttons-ui';

describe('EventBtns', () => {
  let component: EventButtonsUi;
  let fixture: ComponentFixture<EventButtonsUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventButtonsUi]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventButtonsUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
