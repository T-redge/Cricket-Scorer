import { signal } from '@angular/core';

export class BatterClass {
  private onStrike = signal(false);
  private runs = signal(0);
  private deliveries = signal(0);

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
  returnScore(): string {
    let runs = this.runs().toString();
    let balls = this.deliveries().toString();

    let score = runs + "(" + balls + ")";
    return score;
  }
}
