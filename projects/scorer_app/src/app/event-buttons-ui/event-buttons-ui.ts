import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';
import { MatchEvents } from '../event-class/match-events';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { OverClass } from '../over-class/over-class';
import { InningsClass } from '../innings-class/innings-class';
import { Team } from '../team-class/team-class';

@Component({
  selector: 'app-event-buttons-ui',
  imports: [],
  templateUrl: './event-buttons-ui.html',
  styleUrl: './event-buttons-ui.css',
})
export class EventButtonsUi {
  over: InputSignal<OverClass | undefined> = input()
  inning: InputSignal<InningsClass | undefined> = input();
  batTeam: InputSignal<Team | undefined> = input();

  @Output() deliveryEv: EventEmitter<MatchEventTeams> = new EventEmitter();

  checkOverComplete(): boolean {
    let ov = this.over();
    if (ov !== undefined) {
      if (ov.checkOverComplete()) {
        console.warn("true");
        return true;
      } else {
        console.warn("false");
        return false;
      }
    } else {
      return false;
    }
  }

  dotBall() {
    let ov = this.over();
    let bat = this.batTeam();
    if (ov !== undefined && bat !== undefined) {
      let batter = bat.returnOnStrikePlayerName();
      let bowler = ov.returnBowlerName();
      let delivery: DeliveryType = {
        event: DeliveryEvents.DotBall,
        batter: batter,
        bowler: bowler,
        totalRuns: 0,
      }
      let event: MatchEventTeams = {
        event: MatchEvents.DeliveryComplete,
        data: delivery,
      };
      this.deliveryEv.emit(event);
    } else {
      console.warn("Error: Over or Batting Team undefined");
    }
  }
}
