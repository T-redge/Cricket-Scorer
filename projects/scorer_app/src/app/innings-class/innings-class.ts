import { signal } from "@angular/core";


export class InningsClass {
  private maxOvers = 0;
  private overs = signal(0);

  constructor(maxOvers: number) {
    this.maxOvers = maxOvers;
    this.overs.set(0);
  }
  overCompleted() {
    this.overs.update(curr => curr + 1);
  }
  checkInningComplete(): boolean {
    if (this.overs() === this.maxOvers) {
      return true;
    } else {
      return false;
    }
  }
  returnOverCount(): number {
    return this.overs()
  }
}
