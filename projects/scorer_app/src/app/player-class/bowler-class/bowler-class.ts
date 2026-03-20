import { computed, signal } from '@angular/core';
import { BowlerExtras } from '../../extra-class/extra-class';

export class BowlerClass {
  private deliveries = signal(0);
  private overs = signal(0);
  private maidens = signal(0);
  private wickets = signal(0);
  private runs = signal(0);
  private extras = signal(new BowlerExtras);

  deliveryCompleted() {
    this.deliveries.update(curr => curr + 1);
  }
  illegalDeliveryDontIncrementDeliveries() {
    this.deliveries.update(curr => curr - 1);
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
    this.deliveryCompleted();
  }
  runsConceded(runs: number) {
    this.runs.update(curr => curr + runs);
  }
  wideBowled(wides: number) {
    this.extras().wideBowled(wides);
  }
  noballBowled(runs: number) {
    this.extras().noballBowled();
    this.runsConceded(runs);
  }
  returnOversBowled(): number {
    return this.overs();
  }
  returnDeliveriesBowled(): number {
    return this.deliveries();
  }
  returnWicketsTaken(): number {
    return this.wickets();
  }
  returnExtras(): BowlerExtras {
    return this.extras();
  }
  returnFigures(): [string, string] {
    let overs = this.overs().toString();
    let deliveries = this.deliveries().toString();
    let maidens = this.maidens().toString();
    let wickets = this.wickets().toString();
    let runs = computed(() => {
      let runs = this.runs();
      let wd = this.extras().returnWideCount();
      let nb = this.extras().returnNbCount();
      return runs + wd + nb;
    });
    let score = overs + "." + deliveries + "-" + maidens + "-" + wickets + "-" + runs().toString();
    let extras = this.extras().returnBowlerExtras();
    return [score, extras];
  }
}
