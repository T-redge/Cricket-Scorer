import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { Team } from '../team-class/team-class';
import { InningsClass } from '../innings-class/innings-class';
import { MatchEvents } from '../event-class/match-events';
import { Roles } from '../roleselect-ui/roleselect-ui';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { MatchClass } from '../match-class/match-class';

@Component({
  selector: 'app-end-inning-ui',
  imports: [],
  templateUrl: './end-inning-ui.html',
  styleUrl: './end-inning-ui.css',
})
export class EndInningUi {
  homeTeam: InputSignal<Team> = input(new Team("Home Team"));
  awayTeam: InputSignal<Team> = input(new Team("AwayTeam"));
  inning: InputSignal<InningsClass> = input(new InningsClass);
  match: InputSignal<MatchClass> = input(new MatchClass({ id: 0, name: " " }, { id: 0, name: "" }, 0));

  @Output() newInningEvent: EventEmitter<MatchEventTeams> = new EventEmitter();
  @Output() endMatchEvent: EventEmitter<MatchEventTeams> = new EventEmitter();

  returnBatTeam(): Team {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bat) {
      return ht;
    } else {
      return at;
    }
  }
  returnBowlTeam(): Team {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bowl) {
      return ht;
    } else {
      return at;
    }
  }
  returnBatTeamName(): string {
    let bat = this.returnBatTeam();
    return bat.returnTeamName();
  }
  returnBatTeamScore(): string {
    let bat = this.returnBatTeam();
    return bat.returnTeamScore();
  }
  returnOversCompleted(): number {
    let inning = this.inning();
    return inning.returnOverCount();
  }
  returnBatTeamBatters(): Array<[string, string, string]> {
    let bat = this.returnBatTeam();
    return bat.returnBattingListScores();
  }
  returnBowlTeamBowlers(): Array<[string, string]> {
    let bowl = this.returnBowlTeam();
    return bowl.returnBowlerListFigures();
  }
  emitNewInningEvent() {
    let event: MatchEventTeams = {
      event: MatchEvents.NewInning,
      data: undefined,
    }
    this.newInningEvent.emit(event);
  }
  emitEndMatchEvent() {
    let event: MatchEventTeams = {
      event: MatchEvents.MatchEnd,
      data: undefined,
    };
    this.endMatchEvent.emit(event);
  }
  checkMatchCompleted(): boolean {
    let m = this.match();
    if (m.checkMatchComplete()) {
      return true;
    } else {
      return false;
    }
  }
}
