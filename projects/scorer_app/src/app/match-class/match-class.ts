import { signal, WritableSignal } from '@angular/core';
import { InningsClass } from '../innings-class/innings-class'
import { TeamInterface } from '../tauri-command-class/tauri-command-class';

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
  private homeTeam: TeamInterface = { id: 0, name: "" };
  private awayTeam: TeamInterface = { id: 0, name: "" };
  private maxOverAllowed: number = 0;

  private maxInnings = 2;
  private inningsRecord: WritableSignal<Map<InningDescriptor, InningsClass>> = signal(new Map);
  private numInnings: WritableSignal<number> = signal(0);

  constructor(ht: TeamInterface, at: TeamInterface, maxOvers: number) {
    this.homeTeam = ht;
    this.awayTeam = at;
    this.maxOverAllowed = maxOvers;
  }
  returnHomeTeamId(): number {
    return this.homeTeam.id;
  }
  returnAwayTeamId(): number {
    return this.awayTeam.id;
  }
  returnHomeTeamName(): TeamName {
    return this.homeTeam.name;
  }
  returnAwayTeamName(): TeamName {
    return this.awayTeam.name;
  }
  retuyrnMaxOver(): number {
    return this.maxOverAllowed;
  }

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
