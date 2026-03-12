import { InningsClass } from '../innings-class/innings-class'

enum Inning {
  First,
  Second,
}
type TeamName = string;
type InningDescriptor = [Inning, TeamName];

export enum NumberOvers {
  Default = 0,
  Five = 5,
  Ten = 10,
  Twenty = 20,
  Fifty = 50,
}
export class MatchClass {
  inningsRecord: Map<InningDescriptor, InningsClass> = new Map;
}
