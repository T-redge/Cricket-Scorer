import { signal, WritableSignal } from "@angular/core";
import { OverClass } from "../over-class/over-class";

export type Over = number;

export class InningsClass {
  private maxOvers = signal(0);
  private overs: WritableSignal<number> = signal(0);
  private overRecord: WritableSignal<Map<Over, OverClass>> = signal(new Map);

  constructor() {
    this.maxOvers.set(0);
    this.overs.set(0);
  }
  setMaxOvers(max: number) {
    this.maxOvers.set(max);
  }
  overCompleted(dr: OverClass) {
    this.overs.update(curr => curr + 1);
    let ov = this.returnOverCount();
    this.overRecord().set(ov, dr);
  }
  checkInningComplete(): boolean {
    let mo = this.maxOvers();

    let ov = this.overs();

    if (ov === mo) {
      return true;
    } else {
      return false;
    }
  }
  returnOverRecord(ov: Over): OverClass {
    let record = this.overRecord().get(ov);
    if (record !== undefined) {
      return record;
    } else {
      return new OverClass;
    }
  }
  returnOverCount(): number {
    return this.overs()
  }
}
