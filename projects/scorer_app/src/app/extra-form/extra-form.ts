import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';


@Component({
  selector: 'app-extra-form',
  imports: [],
  templateUrl: './extra-form.html',
  styleUrl: './extra-form.css',
})
export class ExtraForm {
  batter = input('');
  bowler = input('');

  @Output() extraEvent: EventEmitter<DeliveryType> = new EventEmitter();

  formLabel = signal(DeliveryEvents.Default);
  showTotalConcededForm = signal(false);

  numExtras = signal(1);

  wideBowled() {
    this.formLabel.set(DeliveryEvents.Wide);
    this.showTotalConcededForm.set(true);
  }
  nbBowled() {
    this.formLabel.set(DeliveryEvents.Noball);
    this.numExtras.set(0);
    this.showTotalConcededForm.set(true);

  }
  byesBowled() {
    this.formLabel.set(DeliveryEvents.Byes);
    this.showTotalConcededForm.set(true);

  }
  legbyesBowled() {
    this.formLabel.set(DeliveryEvents.Legbyes);
    this.showTotalConcededForm.set(true);

  }
  incrementExtras() {
    switch (this.formLabel()) {
      case DeliveryEvents.Wide: {
        if (this.numExtras() < 5) {
          this.numExtras.update(curr => curr + 1);
        }
        break;
      }
      case DeliveryEvents.Noball: {
        if (this.numExtras() < 6) {
          this.numExtras.update(curr => curr + 1);
          if (this.numExtras() === 5) {
            this.numExtras.update(curr => curr + 1);
          }
        }
        break;
      }
      case DeliveryEvents.Byes: {
        if (this.numExtras() < 4) {
          this.numExtras.update(curr => curr + 1);
        }
        break;
      }
      case DeliveryEvents.Legbyes: {
        if (this.numExtras() < 4) {
          this.numExtras.update(curr => curr + 1);
        }
        break;
      }
    }
  }
  decrementExtras() {
    if (this.formLabel() === DeliveryEvents.Noball) {
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
    let batName = this.batter();
    let bowlName = this.bowler();
    let dEv = this.formLabel();
    let runs = this.numExtras();

    let delivery: DeliveryType = { batter: batName, bowler: bowlName, event: dEv, totalRuns: runs };
    this.extraEvent.emit(delivery);
  }
  returnTitleText(): string {
    if (this.formLabel() === DeliveryEvents.Wide) {
      return "wides";
    } else if (this.formLabel() === DeliveryEvents.Noball) {
      return "runs scored";
    } else if (this.formLabel() === DeliveryEvents.Byes) {
      return "byes";
    } else {
      return "legbyes"
    }
  }
}
