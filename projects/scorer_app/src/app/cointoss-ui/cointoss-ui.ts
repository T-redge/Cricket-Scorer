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
