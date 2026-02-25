import { Component, EventEmitter, Output, signal } from '@angular/core';

export enum MatchEvents {
  DotBall = "Dot",
  OneRun = "One",
  TwoRuns = "Two",
  ThreeRuns = "Three",
  FourRuns = "Four",
  SixRuns = "Six",

  Extra = "Extra",
  Wides = "Wides",
  Noball = "Noball",
  NbRuns = "Noball+Runs",
  Byes = "Byes",
  Legbyes = "Legbyes",

  Bowled = "Bowled",
  Caught = "Caught",
  Lbw = "Lbw",
  Stumped = "Stumped",
  Runout = "Runout",

  MatchStart = "Match Started",
  HomeCoinWin = "Home Team Won Coin Toss",
  AwayCoinWin = "Away Team Win Coin Toss",
  RoleBat = "Batting",
  RoleBowl = "Bowling",
  OpenersChosen = "OpenersChosen",
  PlayerChosen = "PlayerChosen",
  OverComplete = "OverComplete"
}

@Component({
  selector: 'app-event-btns',
  imports: [],
  templateUrl: './event-btns.html',
  styleUrl: './event-btns.css',
})
export class EventBtns {
  wide = signal("Wide");
  nb = signal("Noball");
  nbruns = signal("NbRuns");
  byes = signal("Byes");
  legbyes = signal("Legbyes");

  @Output() matchEvent: EventEmitter<MatchEvents> = new EventEmitter();
  @Output() extraEvent: EventEmitter<string> = new EventEmitter();

  eventDotBall() {
    this.matchEvent.emit(MatchEvents.DotBall);
  }
  eventOneRun() {
    this.matchEvent.emit(MatchEvents.OneRun);
  }
  eventTwoRuns() {
    this.matchEvent.emit(MatchEvents.TwoRuns);
  }
  eventThreeRuns() {
    this.matchEvent.emit(MatchEvents.ThreeRuns);
  }
  eventFourRuns() {
    this.matchEvent.emit(MatchEvents.FourRuns);
  }
  eventSixRuns() {
    this.matchEvent.emit(MatchEvents.SixRuns);
  }
  eventExtra(extraType: string) {
    this.matchEvent.emit(MatchEvents.Extra);
    this.extraEvent.emit(extraType);
  }
  eventWides() {
    this.matchEvent.emit(MatchEvents.Wides);
  }
  eventNoball() {
    this.matchEvent.emit(MatchEvents.Noball);
  }
  eventNoballRuns() {
    this.matchEvent.emit(MatchEvents.NbRuns);
  }
  eventByes() {
    this.matchEvent.emit(MatchEvents.Byes);
  }
  eventLegbyes() {
    this.matchEvent.emit(MatchEvents.Legbyes);
  }
  eventBowled() {
    this.matchEvent.emit(MatchEvents.Bowled);
  }
  eventCaught() {
    this.matchEvent.emit(MatchEvents.Caught);
  }
  eventLbw() {
    this.matchEvent.emit(MatchEvents.Lbw);
  }
  eventStumped() {
    this.matchEvent.emit(MatchEvents.Stumped);
  }
  eventRunout() {
    this.matchEvent.emit(MatchEvents.Runout);
  }
}
