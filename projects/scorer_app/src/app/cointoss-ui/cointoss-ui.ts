import { Component, EventEmitter, inject, Output } from '@angular/core';
import { App } from '../app';
import { MatchEvents } from '../event-class/match-events';

@Component({
  selector: 'app-cointoss-ui',
  imports: [],
  templateUrl: './cointoss-ui.html',
  styleUrl: './cointoss-ui.css',
})
export class CointossUi {
  teams = inject(App);

  homeTeamName = this.teams.homeTeamName;
  awayTeamName = this.teams.awayTeamName;

  @Output() homeTeamWin: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() awayTeamWin: EventEmitter<MatchEvents> = new EventEmitter();

  coinTossWinHome() {
    this.homeTeamWin.emit(MatchEvents.HomeCoinWin);
  }
  coinTossWinAway() {
    this.awayTeamWin.emit(MatchEvents.AwayCoinWin);
  }
}
