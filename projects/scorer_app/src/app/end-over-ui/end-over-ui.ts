import { Component, EventEmitter, input, Output } from '@angular/core';
import { OverClass } from '../over-class/over-class';
import { MatchEvents } from '../event-class/match-events';

@Component({
  selector: 'app-end-over-ui',
  imports: [],
  templateUrl: './end-over-ui.html',
  styleUrl: './end-over-ui.css',
})
export class EndOverUi {
  checkInningEnd = input(false);
  lastOver = input(new OverClass());

  @Output() newOver: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() endInning: EventEmitter<MatchEvents> = new EventEmitter();

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
    this.newOver.emit(MatchEvents.NewOver);
  }
  emitEndInning() {
    this.endInning.emit(MatchEvents.InningsComplete);
  }
}
