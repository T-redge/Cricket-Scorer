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
        break;
      }
      case DeliveryEvents.Wide: break;
      case DeliveryEvents.Noball: break;
      case DeliveryEvents.Byes: break;
      case DeliveryEvents.Legbyes: break;
      case DeliveryEvents.Bowled: break;
      case DeliveryEvents.Caught: break;
      case DeliveryEvents.Lbw: break;
      case DeliveryEvents.Stumped: break;
      case DeliveryEvents.Runout: break;
    }
    return line();
  }
}
