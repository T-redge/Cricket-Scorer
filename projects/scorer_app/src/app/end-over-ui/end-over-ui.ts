import { Component, EventEmitter, input, Output } from '@angular/core';
import { OverClass } from '../over-class/over-class';
import { MatchEvents } from '../event-class/match-events';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';

@Component({
  selector: 'app-end-over-ui',
  imports: [],
  templateUrl: './end-over-ui.html',
  styleUrl: './end-over-ui.css',
})
export class EndOverUi {
  checkInningEnd = input(false);
  lastOver = input(new OverClass());

  @Output() newOver: EventEmitter<MatchEventTeams> = new EventEmitter();
  @Output() endInning: EventEmitter<MatchEventTeams> = new EventEmitter();

  returnBowlerName(): string {
    let name = this.lastOver().returnBowlerName();
    if (name !== '') {
      return name;
    } else {
      return "Default Bowler";
    }
  }
  returnRunsScored(): number {
    return this.lastOver().returnRunsScored()
  }
  returnWicketsTaken(): number {
    return this.lastOver().returnWicketsTaken();
  }
  returnExtrasConceded(): number {
    return this.lastOver().returnExtrasConceded();
  }


  emitNewOver() {
    let event: MatchEventTeams = {
      event: MatchEvents.NewOver,
      data: undefined,
    };
    this.newOver.emit(event);
  }
  emitEndInning() {
    let event: MatchEventTeams = {
      event: MatchEvents.InningsComplete,
      data: undefined,
    };
    this.endInning.emit(event);
  }
}
