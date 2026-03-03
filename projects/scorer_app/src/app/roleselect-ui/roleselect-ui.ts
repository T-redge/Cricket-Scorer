import { Component, EventEmitter, inject, Output } from '@angular/core';
import { App } from '../app';
import { MatchEvents } from '../event-class/match-events';

@Component({
  selector: 'app-roleselect-ui',
  imports: [],
  templateUrl: './roleselect-ui.html',
  styleUrl: './roleselect-ui.css',
})
export class RoleselectUi {

  teams = inject(App);

  @Output() roleBat: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() roleBowl: EventEmitter<MatchEvents> = new EventEmitter();

  roleBatSelect() {
    this.roleBat.emit(MatchEvents.RoleBat);
  }
  roleBowlSelect() {
    this.roleBowl.emit(MatchEvents.RoleBowl);
  }
  returnTossWinner(): string {
    let home = this.teams.homeTeamName;
    let away = this.teams.awayTeamName;

    let htTossResult = this.teams.teamsMap.get(home)!.returnTossResult();
    if (htTossResult) {
      return home;
    } else {
      return away;
    }
  }
}
