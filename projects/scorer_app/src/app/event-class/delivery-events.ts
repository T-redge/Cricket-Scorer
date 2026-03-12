export enum DeliveryEvents {
  Default = "Default",
  DotBall = "Dot ball",
  Runs = "Runs Scored",
  Wide = "Wide",
  Noball = "Noball",
  Byes = "Byes",
  Legbyes = "Legbyes",
  Bowled = "Bowled",
  Caught = "Caught",
  Lbw = "Lbw",
  Stumped = "Stumped",
  Runout = "Runout",
}

export type Runs = number;

export type DeliveryType = {
  batter: string,
  bowler: string,
  event: DeliveryEvents,
  totalRuns: Runs,
}
