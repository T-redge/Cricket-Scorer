import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ExtraEvent } from '../event-class/delivery-events';


@Component({
  selector: 'app-extra-form',
  imports: [],
  templateUrl: './extra-form.html',
  styleUrl: './extra-form.css',
})
export class ExtraForm {
  @Output() wideEv: EventEmitter<ExtraEvent> = new EventEmitter();
  @Output() nbEv: EventEmitter<ExtraEvent> = new EventEmitter();
  @Output() byeEv: EventEmitter<ExtraEvent> = new EventEmitter();
  @Output() legbyeEv: EventEmitter<ExtraEvent> = new EventEmitter();

  @Output() totalExtras: EventEmitter<number> = new EventEmitter();

  formLabel = signal('');
  showTotalConcededForm = signal(false);

  numExtras = signal(1);

  wideBowled() {
    this.formLabel.set('Wide');
    this.showTotalConcededForm.set(true);
  }
  nbBowled() {
    this.formLabel.set('Noball');
    this.numExtras.set(0);
    this.showTotalConcededForm.set(true);

  }
  byesBowled() {
    this.formLabel.set('Byes');
    this.showTotalConcededForm.set(true);

  }
  legbyesBowled() {
    this.formLabel.set('Legbyes');
    this.showTotalConcededForm.set(true);

  }

  incrementExtras() {
    if (this.formLabel() === 'Wide') {
      if (this.numExtras() < 5) {
        this.numExtras.update(curr => curr + 1);
      }
    } else if (this.formLabel() === 'Noball') {
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
    if (this.formLabel() === 'Noball') {
      if (this.numExtras() > 0) {
        this.numExtras.update(curr => curr - 1);
        if (this.numExtras() === 5) {
          this.numExtras.update(curr => curr - 1);
        }
      }
    } else if (this.numExtras() > 1) {
      this.numExtras.update(curr => curr - 1);
    }
  }
  confirmExtrasAmount() {
    if (this.formLabel() === 'Wide') {
      this.totalExtras.emit(this.numExtras());
      this.wideEv.emit(ExtraEvent.Wides)
    } else if (this.formLabel() === 'Noball') {
      this.totalExtras.emit(this.numExtras());
      this.nbEv.emit(ExtraEvent.NbRuns);
    } else if (this.formLabel() === 'Byes') {
      this.totalExtras.emit(this.numExtras());
      this.byeEv.emit(ExtraEvent.Byes);
    } else {
      this.totalExtras.emit(this.numExtras());
      this.legbyeEv.emit(ExtraEvent.Legbyes);
    }
  }
  returnTitleText(): string {
    if (this.formLabel() === "Wide") {
      return "wides";
    } else if (this.formLabel() === "Noball") {
      return "runs scored";
    } else if (this.formLabel() === "Byes") {
      return "byes";
    } else {
      return "legbyes"
    }
  }
}
