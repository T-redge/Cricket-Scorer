import { Component, computed, EventEmitter, input, InputSignal, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { NumberOvers } from '../match-class/match-class';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatchEvents } from '../event-class/match-events';
import { TeamInterface } from '../tauri-command-class/tauri-command-class';


export type MatchSetting = {
  home: TeamInterface,
  away: TeamInterface,
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
  teamList: InputSignal<Array<TeamInterface>> = input(new Array);
  buttonDisabled: WritableSignal<boolean> = signal(true);
  overLimit: Array<NumberOvers> = [
    NumberOvers.Default,
    NumberOvers.Five,
    NumberOvers.Ten,
    NumberOvers.Twenty,
    NumberOvers.Fifty
  ];
  selectTeams = new FormGroup({
    selectHomeTeam: new FormControl(0, { nonNullable: true }),
    selectAwayTeam: new FormControl(0, { nonNullable: true }),
    setMaxOvers: new FormControl(this.overLimit[0], { nonNullable: true }),
  });
  @Output() setMatchSettings: EventEmitter<MatchEventTeams> = new EventEmitter();

  checkPristine(): boolean {
    let form = this.selectTeams;
    if (form.dirty) {
      return false;
    } else {
      return true;
    }
  }
  checkOverDefault(): boolean {
    let ov = this.selectTeams.get('setMaxOvers')?.value;
    if (ov === NumberOvers.Default) {
      return true;
    } else {
      return false;
    }
  }
  checkTeamsMatch(): boolean {
    let ht = this.selectTeams.controls.selectHomeTeam.value;
    let at = this.selectTeams.controls.selectAwayTeam.value;
    if (ht === at) {
      return true;
    } else {
      return false;
    }
  }
  checkHomeAway(): boolean {
    if (this.checkTeamsMatch() || this.checkOverDefault() || this.checkPristine()) {
      return true;
    } else {
      return false;
    }
  }
  returnTeam(team_id: number): TeamInterface {
    let team: TeamInterface = { id: 0, name: " " };
    this.teamList().forEach(value => {
      let t_id = value.id;
      if (t_id === team_id) {
        team = value;
      }
    });
    return team;
  }
  submitTeams() {
    let ht_id = this.selectTeams.controls.selectHomeTeam.value;
    let at_id = this.selectTeams.controls.selectAwayTeam.value;
    let ov = this.selectTeams.controls.setMaxOvers.value;


    let ht: TeamInterface = this.returnTeam(ht_id);
    let at: TeamInterface = this.returnTeam(at_id);
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
      case NumberOvers.Default: return 1;
      case NumberOvers.Five: return 5;
      case NumberOvers.Ten: return 10;
      case NumberOvers.Twenty: return 20;
      case NumberOvers.Fifty: return 50;
      default: return 0;
    }
  }
}
