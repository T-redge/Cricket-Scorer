import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RunEvent } from '../event-class/delivery-events';

@Component({
  selector: 'app-run-form',
  imports: [],
  templateUrl: './run-form.html',
  styleUrl: './run-form.css',
})
export class RunForm {
  runsScored = signal(1);

  @Output() totalRuns: EventEmitter<RunEvent> = new EventEmitter();

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
    switch (this.runsScored()) {
      case 1: {
        this.totalRuns.emit(RunEvent.OneRun);
        break;
      }
      case 2: {
        this.totalRuns.emit(RunEvent.TwoRuns);
        break;
      }
      case 3: {
        this.totalRuns.emit(RunEvent.ThreeRuns);
        break;
      }
      case 4: {
        this.totalRuns.emit(RunEvent.FourRuns);
        break;
      }
      case 5: {
        this.totalRuns.emit(RunEvent.FiveRuns);
        break;
      }
      case 6: {
        this.totalRuns.emit(RunEvent.SixRuns);
        break;
      }
    }
  }

}
