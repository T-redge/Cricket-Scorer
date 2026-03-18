import { signal, WritableSignal } from '@angular/core';
import { InningsClass } from '../innings-class/innings-class'

enum Inning {
  First,
  Second,
}
type TeamName = string;
type InningDescriptor = [Inning, TeamName];

export enum NumberOvers {
  Default = "Default",
  Five = "Five",
  Ten = "Ten",
  Twenty = "Twenty",
  Fifty = "Fifty",
}
export class MatchClass {
  private maxInnings = 2;
  private inningsRecord: WritableSignal<Map<InningDescriptor, InningsClass>> = signal(new Map);
  private numInnings: WritableSignal<number> = signal(0);

  checkMatchComplete(): boolean {
    if (this.numInnings() === this.maxInnings) {
      return true;
    } else {
      return false;
    }
  }
  inningCompleted(batTeamName: TeamName, ir: InningsClass) {
    let descrip: InningDescriptor = [Inning.First, batTeamName];
    this.inningsRecord().set(descrip, ir);
    this.numInnings.update(curr => curr + 1);
  }
  returnInning(batTeamName: TeamName): InningsClass | undefined {
    let inning = this.inningsRecord().get([Inning.First, batTeamName]);
    if (inning !== undefined) {
      return inning;
    } else {
      return undefined;
    }
  }
}
