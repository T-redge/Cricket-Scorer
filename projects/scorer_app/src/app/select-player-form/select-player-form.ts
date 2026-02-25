import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { App } from '../app';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatchEvents } from '../event-btns/event-btns';

@Component({
  selector: 'app-select-player-form',
  imports: [ReactiveFormsModule],
  templateUrl: './select-player-form.html',
  styleUrl: './select-player-form.css',
})
export class SelectPlayerForm {
  teams = inject(App);
  homeTeamPlayers = this.teams.returnHomeTeam().returnPlayerNames();
  awayTeamPlayers = this.teams.returnAwayTeam().returnPlayerNames();

  battingTeam = signal(this.returnBattingTeam());
  bowlingTeam = signal(this.returnBowlingTeam());

  formLabel = input('');

  returnPlayerType(): string {
    if (this.formLabel() === 'Bat') {
      return "Batter";
    } else {
      return "Bowler";
    }
  }
  returnTeamForm(): string[] {
    if (this.formLabel() === 'Bat') {
      return this.battingTeam();
    } else {
      return this.bowlingTeam();
    }
  }
  returnBattingTeam(): string[] {
    let ht = this.teams.returnHomeTeam().returnTeamRole();
    if (ht === 'Batting') {
      return this.homeTeamPlayers;
    } else {
      return this.awayTeamPlayers;
    }
  }
  returnBowlingTeam(): string[] {
    let ht = this.teams.returnHomeTeam().returnTeamRole();
    if (ht === 'Batting') {
      return this.awayTeamPlayers;
    } else {
      return this.homeTeamPlayers;
    }
  }

  playerChosen = new FormControl(this.bowlingTeam()[0], { nonNullable: true });

  @Output() playerSelect: EventEmitter<string> = new EventEmitter();
  @Output() playerChosenEv: EventEmitter<MatchEvents> = new EventEmitter();

  confirmPlayerChosenEv() {
    this.playerChosenEv.emit(MatchEvents.PlayerChosen);
  }

  confirmPlayerSelect() {
    let name = this.returnPlayerName();
    this.playerSelect.emit(name);
  }

  returnPlayerName(): string {
    let name = this.playerChosen.getRawValue();
    return name;
  }
}
