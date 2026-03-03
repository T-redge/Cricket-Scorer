export enum DeliveryEvents {
  DotBall = "Dot",
  RunEvent = "RunEvent",
  ExtraEvent = "ExtraEvent",
  WicketEvent = "WicketEvent"
}

export enum RunEvent {
  OneRun = 1,
  TwoRuns = 2,
  ThreeRuns = 3,
  FourRuns = 4,
  FiveRuns = 5,
  SixRuns = 6,
}

export enum ExtraEvent {
  Extra = "Extra",
  Wides = "Wides",
  Noball = "Noball",
  NbRuns = "Noball+Runs",
  Byes = "Byes",
  Legbyes = "Legbyes",
}

export enum WicketEvent {
  Bowled = "Bowled",
  Caught = "Caught",
  Lbw = "Lbw",
  Stumped = "Stumped",
  Runout = "Runout",
}
