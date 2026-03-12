import { Component, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
import { App } from '../app';
import { MatchEvents } from '../event-class/match-events';
import { Team } from '../team-class/team-class';

@Component({
  selector: 'app-roleselect-ui',
  imports: [],
  templateUrl: './roleselect-ui.html',
  styleUrl: './roleselect-ui.css',
})
export class RoleselectUi {
  homeTeam: InputSignal<Team | undefined> = input();
  awayTeam: InputSignal<Team | undefined> = input();

  roleBatSelect() {
    //this.roleBat.emit(MatchEvents.RoleBat);
  }
  roleBowlSelect() {
    //this.roleBowl.emit(MatchEvents.RoleBowl);
  }
  returnTossWinner(): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      let htResult = ht.returnTossResult();
      if (htResult) {
        return ht.returnTeamName();
      } else {
        return at.returnTeamName();
      }
    } else {
      return "Default Winner";
    }
  }
}
