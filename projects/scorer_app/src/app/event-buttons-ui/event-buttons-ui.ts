import { Component, EventEmitter, Output } from '@angular/core';
import { DeliveryEvents } from '../event-class/delivery-events';

@Component({
  selector: 'app-event-buttons-ui',
  imports: [],
  templateUrl: './event-buttons-ui.html',
  styleUrl: './event-buttons-ui.css',
})
export class EventButtonsUi {
  @Output() eventDot: EventEmitter<DeliveryEvents> = new EventEmitter();
  @Output() eventRuns: EventEmitter<DeliveryEvents> = new EventEmitter();
  @Output() eventExtras: EventEmitter<DeliveryEvents> = new EventEmitter();
  @Output() eventWicket: EventEmitter<DeliveryEvents> = new EventEmitter();

  emitDotEvent() {
    this.eventDot.emit(DeliveryEvents.DotBall);
  }
  emitRunEvent() {
    this.eventRuns.emit(DeliveryEvents.RunEvent);
  }
  emitExtraEvent() {
    this.eventRuns.emit(DeliveryEvents.ExtraEvent);
  }
  emitWicketEvent() {
    this.eventWicket.emit(DeliveryEvents.WicketEvent);
  }
}
