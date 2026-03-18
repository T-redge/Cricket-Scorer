import { computed, signal, WritableSignal } from "@angular/core";
import { DeliveryEvents, DeliveryType } from "../event-class/delivery-events";

export class OverClass {
  private bowler = signal('');
  private runs = computed(() => {
    let run = 0;
    this.deliveryRecord().forEach((delivery) => {
      let scored = delivery.totalRuns;
      run += scored;
    });
    return run;
  });
  private wickets = signal(0);
  private extras = signal(0);
  private deliveryRecord: WritableSignal<Array<DeliveryType>> = signal(new Array);

  setBowler(bowlName: string) {
    this.bowler.set(bowlName);
  }
  wicketTaken() {
    this.wickets.update(curr => curr + 1);
  }
  extrasConceded(runs: number) {
    this.extras.update(curr => curr + runs);
  }
  enterDeliveryRecord(delivery: DeliveryType) {
    this.deliveryRecord().push(delivery);
  }
  returnDeliveryRecord(): Array<DeliveryType> {
    return this.deliveryRecord();
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
  checkOverComplete(deliveries: number): boolean {
    if (deliveries === 6) {
      return true;
    } else {
      return false;
    }
  }
}
