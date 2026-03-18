import { Component, EventEmitter, input, InputSignal, Output, signal } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { MatchEvents } from '../event-class/match-events';
import { UiEvent, UiEventType } from '../event-class/ui-events';
import { Team } from '../team-class/team-class';

@Component({
  selector: 'app-run-form',
  imports: [],
  templateUrl: './run-form.html',
  styleUrl: './run-form.css',
})
export class RunForm {
  batTeam: InputSignal<Team | undefined> = input();
  bowlTeam: InputSignal<Team | undefined> = input();

  runsScored = signal(1);

  @Output() runEvent: EventEmitter<MatchEventTeams> = new EventEmitter();
  @Output() hideRunForm: EventEmitter<UiEventType> = new EventEmitter();
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
    let bat = this.batTeam();
    let bowl = this.bowlTeam();
    if (bat !== undefined && bowl !== undefined) {
      let batName = bat.returnOnStrikePlayerName();
      let bowlName = bowl.returnCurrentBowler();
      let dEv = DeliveryEvents.Runs;
      let runs = this.runsScored();

      let delivery: DeliveryType = { batter: batName, bowler: bowlName, event: dEv, totalRuns: runs };

      let event: MatchEventTeams = {
        event: MatchEvents.DeliveryComplete,
        data: delivery,
      };

      let ui: UiEventType = {
        event: UiEvent.ShowRunForm,
        bool: false,
      };
      console.log(delivery);
      this.hideRunForm.emit(ui);
      this.runEvent.emit(event);
    } else {
      console.warn("RunForm: Info undefined");
    }
  }
}
