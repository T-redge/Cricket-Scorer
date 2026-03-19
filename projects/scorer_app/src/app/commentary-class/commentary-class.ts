import { signal, WritableSignal } from "@angular/core";
import { DeliveryType, DeliveryEvents } from "../event-class/delivery-events"
export type CommentaryType = {
  commOver: string;
  commLine: string;
}
export class CommentaryClass {
  overNumber: WritableSignal<string> = signal('');
  deliveryEvent: WritableSignal<DeliveryType> = signal({
    batter: '', bowler: '', event: DeliveryEvents.Default, totalRuns: 0,
  });

  constructor(ov: string, dT: DeliveryType) {
    this.overNumber.set(ov);
    this.deliveryEvent.set(dT);
  }

  createCommentary(): CommentaryType {
    let comm: CommentaryType = {
      commOver: this.overNumber(),
      commLine: this.createCommLine(),
    }
    return comm;
  }
  createCommLine(): string {
    let bat = this.deliveryEvent().batter;
    let bowl = this.deliveryEvent().bowler;
    let ev = this.deliveryEvent().event;
    let runs = this.deliveryEvent().totalRuns;

    let line = bowl + " to " + bat + ": " + this.createEventLine(ev, runs);
    return line;
  }
  createEventLine(ev: DeliveryEvents, runs: number): string {
    let line: WritableSignal<string> = signal('');
    switch (ev) {
      case DeliveryEvents.Default: break;
      case DeliveryEvents.DotBall: {
        line.set("dot ball");
        break;
      }
      case DeliveryEvents.Runs: {
        let num = runs.toString();
        if (runs === 1) {
          line.set(num + " run scored");
        } else {
          line.set(num + " runs scored");
        }
        break;
      }
      case DeliveryEvents.Wide: {
        let num = runs.toString();
        if (runs === 1) {
          line.set(num + " wide bowled");
        } else {
          line.set(num + " wides bowled");
        }
        break;
      }
      case DeliveryEvents.Noball: {
        let num = runs.toString();
        if (runs === 0) {
          line.set("NoBall bowled");
        } else {
          line.set("Noball bowled + " + num);
        }
        break;
      }
      case DeliveryEvents.Byes: {
        let num = runs.toString();
        if (runs === 0) {
          line.set(num + " bye scored");
        } else {
          line.set(num + " byes scored");
        }
        break;
      }
      case DeliveryEvents.Legbyes: {
        let num = runs.toString();
        if (runs === 0) {
          line.set(num + " legbye scored");
        } else {
          line.set(num + " legbyes scored");
        }
        break;
      }
      case DeliveryEvents.Bowled: break;
      case DeliveryEvents.Caught: break;
      case DeliveryEvents.Lbw: break;
      case DeliveryEvents.Stumped: break;
      case DeliveryEvents.Runout: break;
    }
    return line();
  }
}
