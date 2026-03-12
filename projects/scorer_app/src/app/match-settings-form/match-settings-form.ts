import { Component, computed, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { NumberOvers } from '../match-class/match-class';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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
    NumberOvers.Five,
    NumberOvers.Ten,
    NumberOvers.Twenty,
    NumberOvers.Fifty
  ];
  selectTeams = new FormGroup({
    selectHomeTeam: new FormControl('Select...', { nonNullable: true }),
    selectAwayTeam: new FormControl('Select...', { nonNullable: true }),
    setMaxOvers: new FormControl(0, { nonNullable: true }),
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
    let ov = this.selectTeams.controls.setMaxOvers.value;

    let team: MatchSetting = { home: ht, away: at, overs: ov };
    let eventEmit: MatchEventTeams = {
      event: MatchEvents.TeamsSelected,
      data: team,
    };
    console.log(team);
    this.setMatchSettings.emit(eventEmit);
  }
}
