import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { NumberOvers } from '../match-class/match-class';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatchEvents } from '../event-class/match-events';


export type MatchSetting = {
  home: string,
  away: string,
  overs: number,
}
export type MatchEventTeams = {
  event: MatchEvents,
  data: any,
}

@Component({
  selector: 'app-match-settings-form',
  imports: [ReactiveFormsModule],
  templateUrl: './match-settings-form.html',
  styleUrl: './match-settings-form.css',
})
export class MatchSettingsForm {
  buttonDisabled: WritableSignal<boolean> = signal(true);
  teamNames: Array<string> = [
    "Edgewater",
    "Morley",
  ];
  overLimit: Array<NumberOvers> = [
    NumberOvers.Default,
    NumberOvers.Five,
    NumberOvers.Ten,
    NumberOvers.Twenty,
    NumberOvers.Fifty
  ];
  selectTeams = new FormGroup({
    selectHomeTeam: new FormControl('Select...', { nonNullable: true }),
    selectAwayTeam: new FormControl('Select...', { nonNullable: true }),
    setMaxOvers: new FormControl(this.overLimit[0], { nonNullable: true }),
  });

  @Output() setMatchSettings: EventEmitter<MatchEventTeams> = new EventEmitter();

  checkPristine(): boolean {
    let ht = this.selectTeams.controls.selectHomeTeam;
    let at = this.selectTeams.controls.selectAwayTeam;
    let mO = this.selectTeams.controls.setMaxOvers;

    if (ht.dirty && at.dirty && mO.dirty) {
      return false;
    } else {
      return true;
    }
  }
  checkHomeAway() {
    let ht = this.selectTeams.controls.selectHomeTeam.value;
    let at = this.selectTeams.controls.selectAwayTeam.value;
    if (ht === at || this.checkPristine()) {
      this.buttonDisabled.set(true);
    } else {
      this.buttonDisabled.set(false);
    }
  }

  submitTeams() {
    let ht = this.selectTeams.controls.selectHomeTeam.value;
    let at = this.selectTeams.controls.selectAwayTeam.value;
    let ov: NumberOvers = this.selectTeams.controls.setMaxOvers.value;

    let totalOver: number = this.returnOverNumber(ov);



    let team: MatchSetting = { home: ht, away: at, overs: totalOver };
    let eventEmit: MatchEventTeams = {
      event: MatchEvents.TeamsSelected,
      data: team,
    };
    this.setMatchSettings.emit(eventEmit);
  }
  returnOverNumber(over: NumberOvers): number {

    switch (over) {
      case NumberOvers.Default: return 0;
      case NumberOvers.Five: return 5;
      case NumberOvers.Ten: return 10;
      case NumberOvers.Twenty: return 20;
      case NumberOvers.Fifty: return 50;
      default: return 0;
    }
  }
}
