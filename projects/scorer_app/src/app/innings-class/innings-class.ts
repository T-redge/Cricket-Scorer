import { signal, WritableSignal } from "@angular/core";
import { DeliveryType } from "../event-class/delivery-events";
import { NumberOvers } from "../match-class/match-class";


export class InningsClass {
  private maxOvers = signal(0);
  private overs: WritableSignal<number> = signal(0);
  private overRecord: WritableSignal<Map<number, Array<DeliveryType>>> = signal(new Map);

  constructor() {
    this.maxOvers.set(0);
    this.overs.set(0);
  }
  setMaxOvers(max: number) {
    this.maxOvers.set(max);
  }
  overCompleted(dr: Array<DeliveryType>) {
    this.overs.update(curr => curr + 1);
    let ov = this.returnOverCount();
    this.overRecord().set(ov, dr);
  }
  checkInningComplete(): boolean {
    let mo = this.maxOvers();

    let ov = this.overs();
    console.warn(mo);
    console.warn(ov);
    console.warn(mo === NumberOvers.Five);
    console.warn(mo === ov);
    if (ov === mo) {
      return true;
    } else {
      return false;
    }
  }
  returnOverCount(): number {
    return this.overs()
  }
}
