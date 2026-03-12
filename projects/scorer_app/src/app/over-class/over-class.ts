import { signal } from "@angular/core";

export class OverClass {
  private bowler = signal('');
  private deliveries = signal(0);
  private runs = signal(0);
  private wickets = signal(0);
  private extras = signal(0);

  setBowler(bowlName: string) {
    this.bowler.set(bowlName);
  }
  deliveryCompleted() {
    this.deliveries.update(curr => curr + 1);
  }
  runsScored(runs: number) {
    this.runs.update(curr => curr + runs);
  }
  wicketTaken() {
    this.wickets.update(curr => curr + 1);
  }
  extrasConceded(runs: number) {
    this.extras.update(curr => curr + runs);
  }
  returnBowlerName(): string {
    return this.bowler();
  }
  returnRunsScored(): number {
    return this.runs();
  }
  returnWicketsTaken(): number {
    return this.wickets();
  }
  returnExtrasConceded(): number {
    return this.extras();
  }
  returnDeliveryCount(): number {
    return this.deliveries();
  }

  checkOverComplete(): boolean {
    if (this.deliveries() === 6) {
      return true;
    } else {
      return false;
    }
  }
}
