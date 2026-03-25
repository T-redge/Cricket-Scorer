import { signal, WritableSignal } from '@angular/core';
import { DeliveryEvents } from '../../event-class/delivery-events';

export class BatterClass {
  private onStrike = signal(false);
  private runs = signal(0);
  private deliveries = signal(0);
  private dismissalType: WritableSignal<DeliveryEvents> = signal(DeliveryEvents.Default);
  private dismissedBy: WritableSignal<string> = signal('');

  addRunScored(runs: number) {
    this.addDeliveryFaced();
    this.runs.update(curr => curr + runs);
  }
  addDeliveryFaced() {
    this.deliveries.update(curr => curr + 1);
  }
  changeStrikeStatus() {
    if (this.onStrike()) {
      this.onStrike.set(false);
    } else {
      this.onStrike.set(true);
    }
  }
  returnRunsScored(): number {
    return this.runs();
  }
  returnOnstrike(): boolean {
    return this.onStrike();
  }
  returnScore(): [string, string] {
    let runs = this.runs().toString();
    let balls = this.deliveries().toString();

    let dismissal = this.returnDismissal();

    let score = runs + "(" + balls + ")";
    return [dismissal, score];
  }
  playerDismissed(name: string, type: DeliveryEvents) {
    this.dismissalType.set(type);
    this.dismissedBy.set(name);
  }
  returnDismissal(): string {
    let wkt = this.dismissalType();
    let bowler = this.dismissedBy();
    if (wkt === DeliveryEvents.Default) {
      return " "
    } else {
      let line = wkt + ": " + bowler;
      return line;
    }
  }
}
