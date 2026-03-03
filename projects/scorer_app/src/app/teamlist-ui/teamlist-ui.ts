import { Component, EventEmitter, inject, Output } from '@angular/core';
import { App } from '../app';
import { MatchEvents } from '../event-class/match-events';

@Component({
  selector: 'app-teamlist-ui',
  imports: [],
  templateUrl: './teamlist-ui.html',
  styleUrl: './teamlist-ui.css',
})
export class TeamlistUi {
  teams = inject(App);

  homeTeamName = this.teams.homeTeamName;
  homeTeamPlayers = this.teams.teamsMap.get(this.homeTeamName)!.returnPlayerNames();

  awayTeamName = this.teams.awayTeamName;
  awayTeamPlayers = this.teams.teamsMap.get(this.awayTeamName)!.returnPlayerNames();

  @Output() matchStart: EventEmitter<MatchEvents> = new EventEmitter();

  eventMatchStarted() {
    this.matchStart.emit(MatchEvents.MatchStart);
  }
}
