import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { Team } from '../team-class/team-class';
import { InningsClass } from '../innings-class/innings-class';
import { App } from '../app';
import { MatchEvents } from '../event-class/match-events';

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

  @Output() newInningEvent: EventEmitter<MatchEvents> = new EventEmitter();

  returnBatTeam(): Team | undefined {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === 'Batting') {
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
      if (ht.returnTeamRole() === 'Bowling') {
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
  returnBowlTeamBowlers(): Array<[string, string]> {
    let bowl = this.returnBowlTeam();
    if (bowl !== undefined) {
      return bowl.returnBowlerListFigures();
    } else {
      return [["Default Bowler", "Ov-Md-Wk-Rn"]];
    }
  }
  emitNewInningEvent() {
    this.newInningEvent.emit(MatchEvents.NewInning);
  }
}
