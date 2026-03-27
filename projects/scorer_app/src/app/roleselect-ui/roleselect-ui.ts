import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { Team } from '../team-class/team-class';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { MatchEvents } from '../event-class/match-events';
export enum Roles {
  Default = "Default",
  Bat = "Bat",
  Bowl = "Bowl",
  Field = "Field",
}
export type RoleChoice = {
  win: Roles,
  loss: Roles,
}
@Component({
  selector: 'app-roleselect-ui',
  imports: [],
  templateUrl: './roleselect-ui.html',
  styleUrl: './roleselect-ui.css',
})
export class RoleselectUi {
  homeTeam: InputSignal<Team> = input(new Team("Home Team"));
  awayTeam: InputSignal<Team> = input(new Team("Away Team"));

  tossDecision: RoleChoice = { win: Roles.Default, loss: Roles.Default };

  @Output() selectRole: EventEmitter<MatchEventTeams> = new EventEmitter();

  roleBatSelect() {
    let data: RoleChoice = {
      win: Roles.Bat,
      loss: Roles.Bowl,
    }
    let event: MatchEventTeams = {
      event: MatchEvents.RoleSelected,
      data: data,
    }
    this.selectRole.emit(event);
  }
  roleBowlSelect() {
    let data: RoleChoice = {
      win: Roles.Bowl,
      loss: Roles.Bat,
    }
    let event: MatchEventTeams = {
      event: MatchEvents.RoleSelected,
      data: data,
    }
    this.selectRole.emit(event);
  }
  returnTossWinner(): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();

    let htResult = ht.returnTossResult();
    if (htResult) {
      return ht.returnTeamName();
    } else {
      return at.returnTeamName();
    }
  }
}
