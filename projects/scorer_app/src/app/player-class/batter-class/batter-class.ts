import { signal } from '@angular/core';

export class BatterClass {
  onStrike = signal(false);
  runs = signal(0);
  deliveries = signal(0);

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
