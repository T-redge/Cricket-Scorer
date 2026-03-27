import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { MatchEvents } from '../event-class/match-events';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';

export type TossResult = {
  home: boolean,
  away: boolean,
};

@Component({
  selector: 'app-cointoss-ui',
  imports: [],
  templateUrl: './cointoss-ui.html',
  styleUrl: './cointoss-ui.css',
})
export class CointossUi {
  homeTeamName: InputSignal<string> = input("Home Team");
  awayTeamName: InputSignal<string> = input("Away Team");

  returnHomeName(): string {
    return this.homeTeamName();
  }
  returnAwayName(): string {
    return this.awayTeamName();
  }

  @Output() tossCompleted: EventEmitter<MatchEventTeams> = new EventEmitter();

  coinTossWinHome() {
    let data: TossResult = {
      home: true,
      away: false,
    }
    let event: MatchEventTeams = {
      event: MatchEvents.TossCompleted,
      data: data,
    };
    this.tossCompleted.emit(event);
  }
  coinTossWinAway() {
    let data: TossResult = {
      home: false,
      away: true,
    }
    let event: MatchEventTeams = {
      event: MatchEvents.TossCompleted,
      data: data,
    };
    this.tossCompleted.emit(event);
  }
}
