import { Component, EventEmitter, input, InputSignal, Output, signal } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';

@Component({
  selector: 'app-run-form',
  imports: [],
  templateUrl: './run-form.html',
  styleUrl: './run-form.css',
})
export class RunForm {
  batter = input('');
  bowler = input('');

  runsScored = signal(1);

  @Output() emitRunEvent: EventEmitter<DeliveryType> = new EventEmitter();

  incrementRuns() {
    if (this.runsScored() < 6) {
      this.runsScored.update(curr => curr + 1);
    }
  }
  decrementRuns() {
    if (this.runsScored() > 1) {
      this.runsScored.update(curr => curr - 1);
    }
  }
  confirmRuns() {
    let batName = this.batter();
    let bowlName = this.bowler();
    let dEv = DeliveryEvents.Runs;
    let runs = this.runsScored();

    let delivery: DeliveryType = { batter: batName, bowler: bowlName, event: dEv, totalRuns: runs };
    this.emitRunEvent.emit(delivery);
  }
}
