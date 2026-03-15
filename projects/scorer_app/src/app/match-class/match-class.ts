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
  inningsRecord: Map<InningDescriptor, InningsClass> = new Map;
}
