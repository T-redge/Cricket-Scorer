import { Component, EventEmitter, Output } from '@angular/core';
import { WicketEvent } from '../event-class/delivery-events';

@Component({
  selector: 'app-wicket-form',
  imports: [],
  templateUrl: './wicket-form.html',
  styleUrl: './wicket-form.css',
})
export class WicketForm {
  @Output() wicketTaken: EventEmitter<WicketEvent> = new EventEmitter();

  wicketBowled() {
    this.wicketTaken.emit(WicketEvent.Bowled);
  }
  wicketCaught() {
    this.wicketTaken.emit(WicketEvent.Caught);
  }
  wicketLbw() {
    this.wicketTaken.emit(WicketEvent.Lbw);
  }
  wicketStumped() {
    this.wicketTaken.emit(WicketEvent.Stumped);
  }
  wicketRunout() {
    this.wicketTaken.emit(WicketEvent.Runout);
  }
}
