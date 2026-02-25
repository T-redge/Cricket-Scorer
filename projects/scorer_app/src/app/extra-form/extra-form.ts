import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { MatchEvents } from '../event-btns/event-btns';


@Component({
  selector: 'app-extra-form',
  imports: [],
  templateUrl: './extra-form.html',
  styleUrl: './extra-form.css',
})
export class ExtraForm {
  @Output() wideBowled: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() nbRunsBowled: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() byesBowled: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() legbyesBowled: EventEmitter<MatchEvents> = new EventEmitter();

  @Output() totalExtras: EventEmitter<number> = new EventEmitter();

  formLabel = input('');

  numExtras = signal(1);

  incrementExtras() {
    if (this.formLabel() === 'Wide') {
      if (this.numExtras() < 5) {
        this.numExtras.update(curr => curr + 1);
      }
    } else if (this.formLabel() === 'NbRuns') {
      if (this.numExtras() < 6) {
        this.numExtras.update(curr => curr + 1);
        if (this.numExtras() === 5) {
          this.numExtras.update(curr => curr + 1);
        }
      }
    } else {
      if (this.numExtras() < 4) {
        this.numExtras.update(curr => curr + 1);
      }
    }
  }
  decrementExtras() {
    if (this.numExtras() > 1) {
      this.numExtras.update(curr => curr - 1);
      if (this.formLabel() === 'NbRuns' && this.numExtras() === 5) {
        this.numExtras.update(curr => curr - 1);
      }
    }
  }
  confirmExtrasAmount() {
    if (this.formLabel() === 'Wide') {
      this.totalExtras.emit(this.numExtras());
      this.wideBowled.emit(MatchEvents.Wides)
    } else if (this.formLabel() === 'NbRuns') {
      this.totalExtras.emit(this.numExtras());
      this.nbRunsBowled.emit(MatchEvents.NbRuns);
    } else if (this.formLabel() === 'Byes') {
      this.totalExtras.emit(this.numExtras());
      this.byesBowled.emit(MatchEvents.Byes);
    } else {
      this.totalExtras.emit(this.numExtras());
      this.legbyesBowled.emit(MatchEvents.Legbyes);
    }
  }
  returnTitleText(): string {
    if (this.formLabel() === "Wide") {
      return "wides";
    } else if (this.formLabel() === "NbRuns") {
      return "runs scored";
    } else if (this.formLabel() === "Byes") {
      return "byes";
    } else {
      return "legbyes"
    }
  }
}
