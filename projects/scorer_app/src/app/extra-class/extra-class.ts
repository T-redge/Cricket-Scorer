import { signal } from "@angular/core";

export class BowlerExtras {
  private wides = signal(0);
  private noballs = signal(0);

  wideBowled(wides: number) {
    this.wides.update(curr => curr + wides);
  }
  noballBowled() {
    this.noballs.update(curr => curr + 1);
  }

  returnWideCount(): number {
    return this.wides()
  }
  returnNbCount(): number {
    return this.noballs();
  }
  returnBowlerExtras(): string {
    let wides = this.returnWideCount().toString();
    let nb = this.returnNbCount().toString();

    let extras = wides + "w " + nb + "nb";
    return extras;
  }
}

export class TeamExtras {
  bye = signal(0);
  legbye = signal(0);
}
