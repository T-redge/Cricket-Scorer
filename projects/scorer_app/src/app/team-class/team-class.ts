import { signal } from "@angular/core";
import { PlayerClass } from "../player-class/player-class";
import { MatchEvents } from "../event-btns/event-btns";

export class Team {
  private tossWon = signal(false);
  private teamRole = signal('');
  private playerMap: Map<string, PlayerClass> = new Map;

  private teamOvers = signal(0);
  private teamDeliveries = signal(0);

  private teamRuns = signal(0);
  private teamWickets = signal(0);

  private batterOne = signal('');
  private batterTwo = signal('');

  private currentBowler = signal('');
  private lastBowler = signal('');

  setCurrentBowler(name: string) {
    this.currentBowler.set(name);
  }
  returnCurrentBowler(): string {
    return this.currentBowler();
  }
  setLastBowler(name: string) {
    this.lastBowler.set(name);
  }
  returnLastBowler(): string {
    return this.lastBowler();
  }
  setBatterOne(name: string) {
    this.batterOne.set(name);
    this.returnPlayerProfile(name).returnBatProfile().changeStrikeStatus();
  }
  returnBatterOne(): string {
    return this.batterOne();
  }
  setBatterTwo(name: string) {
    this.batterTwo.set(name);
  }
  returnBatterTwo(): string {
    return this.batterTwo();
  }
  teamDeliveryBowled() {
    this.teamDeliveries.update(curr => curr + 1);
  }
  teamOverBowled() {
    this.teamOvers.update(curr => curr + 1);
  }
  teamRunScored(runs: number) {
    this.teamRuns.update(curr => curr + runs);
  }
  teamWicketDismissal() {
    this.teamWickets.update(curr => curr + 1);
  }
  returnTeamScore(): string {
    let runs = this.teamRuns().toString();
    let wickets = this.teamWickets().toString();

    let score = wickets + ' - ' + runs;
    return score;
  }
  returnOversScore(): string {
    let overs = this.teamOvers().toString();
    let deliveries = this.teamDeliveries().toString();

    let score = overs + '.' + deliveries;
    return score;
  }
  loadPlayers(players: string[]) {
    for (let pName of players) {
      this.playerMap.set(pName, new PlayerClass);
    }
  }
  setTossResult(win: boolean) {
    this.tossWon.set(win);
  }
  setTeamRole(role: MatchEvents) {
    this.teamRole.set(role);
  }
  strikeRotated() {
    this.returnPlayerProfile(this.batterOne()).returnBatProfile().changeStrikeStatus();
    this.returnPlayerProfile(this.batterTwo()).returnBatProfile().changeStrikeStatus();
  }
  returnPlayerNames(): string[] {
    let names = new Array;
    let list = this.playerMap.keys();

    for (let pName of list) {
      names.push(pName);
    }
    return names;
  }
  returnTeamRole(): string {
    return this.teamRole();
  }
  returnTossResult(): boolean {
    if (this.tossWon()) {
      return true;
    } else {
      return false;
    }
  }
  returnPlayerProfile(name: string): PlayerClass {
    return this.playerMap.get(name)!;
  }
  returnOnStrikePlayer(): PlayerClass {
    let b1 = this.batterOne();
    let b2 = this.batterTwo();

    if (this.returnPlayerProfile(b1).batProfile.onStrike()) {
      return this.returnPlayerProfile(b1);
    } else {
      return this.returnPlayerProfile(b2);
    }
  }
}
