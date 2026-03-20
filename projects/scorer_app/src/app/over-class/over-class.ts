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
  private extras = computed(() => {
    let extras = 0;
    this.deliveryRecord().forEach((delivery) => {
      if (delivery.event === DeliveryEvents.Wide) {
        extras += delivery.totalRuns;
      }
      if (delivery.event === DeliveryEvents.Noball) {
        extras += 1;
      }
    });
    return extras;
  });
  private deliveryRecord: WritableSignal<Array<DeliveryType>> = signal(new Array);

  setBowler(bowlName: string) {
    this.bowler.set(bowlName);
  }
  wicketTaken() {
    this.wickets.update(curr => curr + 1);
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
  checkPreviousDeliveryLegit(): boolean {
    let last = this.deliveryRecord().length - 1;
    let record = this.deliveryRecord().at(last);
    if (record !== undefined) {
      if (record.event === DeliveryEvents.Wide || record.event === DeliveryEvents.Noball) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  checkOverComplete(deliveries: number): boolean {
    if (deliveries === 6) {
      return true;
    } else {
      return false;
    }
  }
}
