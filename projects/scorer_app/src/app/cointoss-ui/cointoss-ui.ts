import { Component, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
import { App } from '../app';
import { MatchEvents } from '../event-class/match-events';
import { Team } from '../team-class/team-class';

@Component({
  selector: 'app-cointoss-ui',
  imports: [],
  templateUrl: './cointoss-ui.html',
  styleUrl: './cointoss-ui.css',
})
export class CointossUi {
  homeTeamName: InputSignal<string | undefined> = input();
  awayTeamName: InputSignal<string | undefined> = input();

  returnHomeName(): string {
    if (this.homeTeamName() !== undefined) {
      return this.homeTeamName()!;
    } else {
      return "Default Home"
    }
  }
  returnAwayName(): string {
    if (this.awayTeamName() !== undefined) {
      return this.awayTeamName()!;
    } else {
      return "Default Away";
    }
  }

  @Output() homeTeamWin: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() awayTeamWin: EventEmitter<MatchEvents> = new EventEmitter();

  coinTossWinHome() {
    this.homeTeamWin.emit(MatchEvents.HomeCoinWin);
  }
  coinTossWinAway() {
    this.awayTeamWin.emit(MatchEvents.AwayCoinWin);
  }
}
