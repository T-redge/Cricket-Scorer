import { Component, EventEmitter, input, Output } from '@angular/core';
import { DeliveryEvents } from '../event-class/delivery-events';
import { MatchEvents } from '../event-class/match-events';

@Component({
  selector: 'app-event-buttons-ui',
  imports: [],
  templateUrl: './event-buttons-ui.html',
  styleUrl: './event-buttons-ui.css',
})
export class EventButtonsUi {
  overComplete = input(false);
  inningComplete = input(false);

  @Output() dotEvent: EventEmitter<number> = new EventEmitter();
}
