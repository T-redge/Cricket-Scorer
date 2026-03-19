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
  private bye = signal(0);
  private legbye = signal(0);

  byeBowled(byes: number) {
    this.bye.update(curr => curr + byes);
  }
  legbyeBowled(lb: number) {
    this.legbye.update(curr => curr + lb);
  }
  returnByeCount(): number {
    return this.bye();
  }
  returnLegbyeCount(): number {
    return this.legbye();
  }
  returnTeamExtras(): string {
    let b = this.returnByeCount().toString();
    let lb = this.returnLegbyeCount().toString();

    let extras = b + "b " + lb + "lb ";
    return extras;
  }
}
