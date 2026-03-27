import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
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
  homeTeam: InputSignal<Team> = input(new Team("Home Team"));
  awayTeam: InputSignal<Team> = input(new Team("Away Team"));

  returnHomeName(): string {
    return this.homeTeam().returnTeamName();
  }
  returnAwayName(): string {
    return this.awayTeam().returnTeamName();
  }
  returnHomePlayerList(): Array<string> {
    return this.homeTeam().returnPlayerNames();
  }
  returnAwayPlayerList(): Array<string> {
    return this.awayTeam().returnPlayerNames();
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
