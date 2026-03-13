import { Component, input, InputSignal } from '@angular/core';
import { OverClass } from '../over-class/over-class';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';

@Component({
  selector: 'app-commentary-ui',
  imports: [],
  templateUrl: './commentary-ui.html',
  styleUrl: './commentary-ui.css',
})
export class CommentaryUi {
  over: InputSignal<OverClass | undefined> = input();

  returnDeliveryRecord(): Array<DeliveryType> {
    let record = this.over();
    if (record !== undefined) {
      return record.returnDeliveryRecord().reverse();
    } else {
      return new Array;
    }
  }
  returnDeliveryDisplay(): Array<string> {
    let record = this.over();
    let display: Array<string> = new Array;
    if (record !== undefined) {
      for (let ball of this.returnDeliveryRecord()) {
        let dp = this.createEvDisplay(ball);
        display.push(dp);
      }
    }
    return display.reverse();
  }
  returnCommentaryString(event: DeliveryType): string {
    let evDelivery = event.event;
    let evBatter = event.batter;
    let evBowler = event.bowler;
    let evRuns = event.totalRuns;


    let comm = evBowler + " to " + evBatter + ": " + this.createEvComm(evDelivery, evRuns);
    return comm;
  }
  createEvComm(event: DeliveryEvents, runs: number): string {
    let comm: string = '';
    let tRuns = runs.toString();
    switch (event) {
      case DeliveryEvents.Default: {
        comm = tRuns;
        break;
      }
      case DeliveryEvents.DotBall: {
        comm = "dot ball";
        break;
      }
      case DeliveryEvents.Runs: {
        break;
      }
      case DeliveryEvents.Wide: {
        break;
      }
      case DeliveryEvents.Noball: {
        break;
      }
      case DeliveryEvents.Byes: {
        break;
      }
      case DeliveryEvents.Legbyes: {
        break;
      }
      case DeliveryEvents.Bowled: {
        break;
      }
      case DeliveryEvents.Caught: {
        break;
      }
      case DeliveryEvents.Lbw: {
        break;
      }
      case DeliveryEvents.Stumped: {
        break;
      }
      case DeliveryEvents.Runout: {
        break;
      }
    }
    return comm;
  }
  createEvDisplay(delivery: DeliveryType): string {
    let runs = delivery.totalRuns;
    let event = delivery.event;
    let display: string = '';
    switch (event) {
      case DeliveryEvents.DotBall: {
        display = ".";
        break;
      }
      case DeliveryEvents.Runs: {
        display = runs.toString();
        break;
      }
      case DeliveryEvents.Wide: {
        break;
      }
      case DeliveryEvents.Noball: {
        break;
      }
      case DeliveryEvents.Byes: break;
      case DeliveryEvents.Legbyes: break;
      case DeliveryEvents.Bowled: break;
      case DeliveryEvents.Caught: break;
      case DeliveryEvents.Lbw: break;
      case DeliveryEvents.Stumped: break;
      case DeliveryEvents.Runout: break;
    }
    return display;
  }
}
