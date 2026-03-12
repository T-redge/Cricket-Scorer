import { Component, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
import { MatchEvents } from '../event-class/match-events';
import { Team } from '../team-class/team-class';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';

@Component({
  selector: 'app-teamlist-ui',
  imports: [],
  templateUrl: './teamlist-ui.html',
  styleUrl: './teamlist-ui.css',
})
export class TeamlistUi {
  homeTeam: InputSignal<Team | undefined> = input();
  awayTeam: InputSignal<Team | undefined> = input();

  returnHomeName(): string {
    if (this.homeTeam() !== undefined) {
      return this.homeTeam()?.returnTeamName()!;
    } else {
      return "Default Home";
    }
  }
  returnAwayName(): string {
    if (this.awayTeam() !== undefined) {
      return this.awayTeam()?.returnTeamName()!;
    } else {
      return "Default Away";
    }
  }
  returnHomePlayerList(): Array<string> {
    if (this.homeTeam() !== undefined) {
      return this.homeTeam()?.returnPlayerNames()!;
    } else {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
    }
  }
  returnAwayPlayerList(): Array<string> {
    if (this.awayTeam() !== undefined) {
      return this.awayTeam()?.returnPlayerNames()!;
    } else {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
    }
  }

  @Output() matchStart: EventEmitter<MatchEventTeams> = new EventEmitter();

  eventMatchStarted() {
    let event: MatchEventTeams = {
      event: MatchEvents.MatchStart,
      data: undefined,
    }
    this.matchStart.emit(event);
  }
}
