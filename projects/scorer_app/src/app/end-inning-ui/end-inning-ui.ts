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
  homeTeam: InputSignal<Team | undefined> = input();
  awayTeam: InputSignal<Team | undefined> = input();

  inning: InputSignal<InningsClass | undefined> = input();
  match: InputSignal<MatchClass | undefined> = input();
  @Output() newInningEvent: EventEmitter<MatchEventTeams> = new EventEmitter();
  @Output() endMatchEvent: EventEmitter<MatchEventTeams> = new EventEmitter();

  returnBatTeam(): Team | undefined {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bat) {
        return ht;
      } else {
        return at;
      }
    } else {
      return undefined;
    }
  }
  returnBowlTeam(): Team | undefined {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bowl) {
        return ht;
      } else {
        return at;
      }
    } else {
      return undefined;
    }
  }
  returnBatTeamName(): string {
    let bat = this.returnBatTeam();
    if (bat !== undefined) {
      return bat.returnTeamName();
    } else {
      return "Default Team";
    }
  }
  returnBatTeamScore(): string {
    let bat = this.returnBatTeam();
    if (bat !== undefined) {
      return bat.returnTeamScore();
    } else {
      return "w-runs";
    }
  }
  returnOversCompleted(): number {
    let inning = this.inning();
    if (inning !== undefined) {
      return inning.returnOverCount();
    } else {
      return 0.0;
    }
  }
  returnBatTeamBatters(): Array<[string, string, string]> {
    let bat = this.returnBatTeam();
    if (bat !== undefined) {
      return bat.returnBattingListScores();
    } else {
      return [["Default Batter", "DNB", "Runs(Deliveries)"]];
    }
  }
  returnBowlTeamBowlers(): Array<[string, string]> {
    let bowl = this.returnBowlTeam();
    if (bowl !== undefined) {
      return bowl.returnBowlerListFigures();
    } else {
      return [["Default Bowler", "Ov-Md-Wk-Rn"]];
    }
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
    if (m !== undefined) {
      if (m.checkMatchComplete()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
}
