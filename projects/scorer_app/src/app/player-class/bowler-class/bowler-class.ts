import { signal } from '@angular/core';

export class BowlerClass {
  deliveries = signal(0);
  overs = signal(0);
  maidens = signal(0);
  wickets = signal(0);
  runs = signal(0);
  wides = signal(0);
  noballs = signal(0);

  deliveryCompleted() {
    this.deliveries.update(curr => curr + 1);
  }
  overBowled() {
    this.overs.update(curr => curr + 1);
    this.deliveries.set(0);
  }
  maidenBowled() {
    this.maidens.update(curr => curr + 1);
  }
  wicketTaken() {
    this.wickets.update(curr => curr + 1);
  }
  runsConceded(runs: number) {
    this.runs.update(curr => curr + runs);
  }
  wideBowled(wides: number) {
    this.wides.update(curr => curr + wides);
    this.runsConceded(wides);
  }
  noballBowled(runs: number) {
    let nb = 1;
    this.noballs.update(curr => curr + nb);
    this.runsConceded(runs + nb);
  }
  returnScore(): string {
    let overs = this.overs().toString();
    let deliveries = this.deliveries().toString();
    let maidens = this.maidens().toString();
    let wickets = this.wickets().toString();
    let runs = this.runs().toString();
    let score = overs + "." + deliveries + "-" + maidens + "-" + wickets + "-" + runs;
    return score;
  }
  returnExtras(): string {
    let wides = this.wides();
    let nb = this.noballs();

    let extras = "wd(" + wides + "), nb(" + nb + ")";
    return extras;
  }
}
