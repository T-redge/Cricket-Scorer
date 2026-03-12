import { Component, EventEmitter, input, Output } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';

@Component({
  selector: 'app-wicket-form',
  imports: [],
  templateUrl: './wicket-form.html',
  styleUrl: './wicket-form.css',
})
export class WicketForm {
  batter = input('');
  bowler = input('');

  @Output() wicketTaken: EventEmitter<DeliveryType> = new EventEmitter();

  wicketBowled() {
    let batName = this.batter();
    let bowlName = this.bowler();
    let event = DeliveryEvents.Bowled;

    let dType: DeliveryType = { batter: batName, bowler: bowlName, event: event, totalRuns: 0 };
    this.wicketTaken.emit(dType);
  }
  wicketCaught() {
    let batName = this.batter();
    let bowlName = this.bowler();
    let event = DeliveryEvents.Caught;

    let dType: DeliveryType = { batter: batName, bowler: bowlName, event: event, totalRuns: 0 };
    this.wicketTaken.emit(dType);
  }
  wicketLbw() {
    let batName = this.batter();
    let bowlName = this.bowler();
    let event = DeliveryEvents.Lbw;

    let dType: DeliveryType = { batter: batName, bowler: bowlName, event: event, totalRuns: 0 };
    this.wicketTaken.emit(dType);
  }
  wicketStumped() {
    let batName = this.batter();
    let bowlName = this.bowler();
    let event = DeliveryEvents.Stumped;

    let dType: DeliveryType = { batter: batName, bowler: bowlName, event: event, totalRuns: 0 };
    this.wicketTaken.emit(dType);
  }
  wicketRunout() {
    let batName = this.batter();
    let bowlName = this.bowler();
    let event = DeliveryEvents.Runout;

    let dType: DeliveryType = { batter: batName, bowler: bowlName, event: event, totalRuns: 0 };
    this.wicketTaken.emit(dType);
  }
}
