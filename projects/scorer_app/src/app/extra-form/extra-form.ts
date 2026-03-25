import { Component, EventEmitter, input, InputSignal, Output, signal } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';
import { UiEvent, UiEventType } from '../event-class/ui-events';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { Team } from '../team-class/team-class';
import { MatchEvents } from '../event-class/match-events';


@Component({
  selector: 'app-extra-form',
  imports: [],
  templateUrl: './extra-form.html',
  styleUrl: './extra-form.css',
})
export class ExtraForm {
  batTeam: InputSignal<Team | undefined> = input();
  bowlTeam: InputSignal<Team | undefined> = input();

  @Output() extraEvent: EventEmitter<MatchEventTeams> = new EventEmitter();
  @Output() hideExtraForm: EventEmitter<UiEventType> = new EventEmitter();

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
    let batTeam = this.batTeam();
    let bowlTeam = this.bowlTeam();
    if (batTeam !== undefined && bowlTeam !== undefined) {
      let dEv = this.formLabel();
      let runs = this.numExtras();
      let batName = batTeam.returnOnStrikePlayerName();
      let bowlName = bowlTeam.returnCurrentBowler();
      let delivery: DeliveryType = { batter: batName, bowler: bowlName, event: dEv, totalRuns: runs };
      let event: MatchEventTeams = {
        event: MatchEvents.DeliveryComplete,
        data: delivery,
      };
      let ui: UiEventType = {
        event: UiEvent.ShowExtraForm,
        bool: false,
      }
      this.extraEvent.emit(event);
      this.hideExtraForm.emit(ui);
    }
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
