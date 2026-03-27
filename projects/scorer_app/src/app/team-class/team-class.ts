import { computed, isWritableSignal, signal, WritableSignal, ɵɵpureFunction0 } from "@angular/core";
import { PlayerClass } from "../player-class/player-class";
import { Roles } from "../roleselect-ui/roleselect-ui";
import { TeamExtras } from "../extra-class/extra-class";
import { DeliveryEvents } from "../event-class/delivery-events";
import { PlayerInterface } from "../tauri-command-class/tauri-command-class";

export class Team {
  private name = '';
  private tossWon = signal(false);
  private teamRole: WritableSignal<Roles> = signal(Roles.Default);
  private playerMap: Map<number, PlayerClass> = new Map;
  private fallOfWicket: WritableSignal<Array<[number, number, string]>> = signal(new Array);
  private teamExtras: WritableSignal<TeamExtras> = signal(new TeamExtras);
  private teamBowlerWides = signal(0);
  private teamBowlerNb = signal(0);
  private teamOvers = computed(() => {
    let overs = 0;
    this.playerMap.forEach((profile) => {
      let o = profile.returnBowlProfile().returnOversBowled();
      overs += o;
    });
    return overs;
  });
  private teamDeliveries = computed(() => {
    let bowler = this.returnCurrentBowler();
    let deliveries = this.returnPlayerProfile(bowler);
    if (deliveries !== undefined) {
      return deliveries.returnBowlProfile().returnDeliveriesBowled();
    } else {
      return 0;
    }
  });
  private teamRuns = computed(() => {
    let runs = 0;
    let wd = this.teamBowlerWides();
    let nb = this.teamBowlerNb();
    let b = this.teamExtras().returnByeCount();
    let lb = this.teamExtras().returnLegbyeCount();
    this.playerMap.forEach((profile) => {
      let r = profile.returnBatProfile().returnRunsScored();
      runs += r;
    });
    return runs + b + lb + wd + nb;
  });
  private teamWickets = signal(0);

  private batterOne = signal('');
  private batterTwo = signal('');

  private currentBowler = signal('');
  private lastBowler = signal('');

  constructor(teamName: string) {
    this.name = teamName;
  }

  returnFallofWicket(): Array<[number, number, string]> {
    return this.fallOfWicket();
  }
  returnFallofWicketNames(): Array<string> {
    let outBats: Array<string> = new Array;
    this.fallOfWicket().forEach((player) => {
      let name = player[2];
      outBats.push(name);
    });
    return outBats;
  }
  checkAllOut(): boolean {
    if (this.teamWickets() === 10) {
      return true;
    } else {
      return false;
    }
  }
  batterDismissed(bowlName: string, type: DeliveryEvents) {
    let wktNum = this.teamWickets() + 1;
    let batName = this.returnOnStrikePlayerName();
    let score = this.teamRuns();
    this.fallOfWicket().push([wktNum, score, batName]);
    this.teamWickets.update(curr => curr + 1);
    //this.playerMap.get(batName)!.returnBatProfile().playerDismissed(bowlName, type);
  }
  returnTeamName(): string {
    return this.name;
  }
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
  returnTeamScore(): string {
    let runs = this.teamRuns().toString();
    let wickets = this.teamWickets();

    let score = wickets.toString() + ' - ' + runs;
    return score;
  }
  returnOversScore(): string {
    let overs = this.teamOvers().toString();
    let deliveries = this.teamDeliveries().toString();

    let score = overs + '.' + deliveries;
    return score;
  }
  loadPlayers(players: Array<PlayerInterface>) {
    let p = players;
    p.forEach(value => {
      let id = value.id;
      let name = value.name;
      this.playerMap.set(id, new PlayerClass(name));
    });
  }
  setTossResult(win: boolean) {
    this.tossWon.set(win);
  }
  setTeamRole(role: Roles) {
    this.teamRole.set(role);
  }
  byeBowled(runs: number) {
    this.teamExtras().byeBowled(runs);
  }
  legbyeBowled(runs: number) {
    this.teamExtras().legbyeBowled(runs);
  }
  strikeRotated() {
    this.returnPlayerProfile(this.batterOne()).returnBatProfile().changeStrikeStatus();
    this.returnPlayerProfile(this.batterTwo()).returnBatProfile().changeStrikeStatus();

  }
  getBowlersWide(wd: number) {
    this.teamBowlerWides.update(curr => curr + wd);
  }
  getBowlersNb(nb: number) {
    this.teamBowlerNb.update(curr => curr + nb);
  }
  returnPlayerNames(): string[] {
    let names = new Array;
    let list = this.playerMap.keys();

    for (let pName of list) {
      names.push(pName);
    }
    return names;
  }
  returnTeamRole(): Roles {
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
    //return this.playerMap.get(name)!;
    return new PlayerClass('');
  }
  returnOnStrikePlayerName(): string {
    let b1 = this.batterOne();
    let b2 = this.batterTwo();

    if (this.returnPlayerProfile(b1).batProfile.returnOnstrike()) {
      return b1;
    } else {
      return b2;
    }
  }
  returnOffStrikeName(): string {
    let b1 = this.batterOne();
    let b2 = this.batterTwo();

    if (this.returnPlayerProfile(b1).batProfile.returnOnstrike()) {
      return b2;
    } else {
      return b1;
    }
  }
  checkBatOneStrike(): string {
    let b1 = this.batterOne();
    let bat = this.returnPlayerProfile(b1);
    if (bat !== undefined) {
      if (bat.returnBatProfile().returnOnstrike()) {
        return '*';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  checkBatTwoStrike(): string {
    let b2 = this.batterTwo();
    let bat = this.returnPlayerProfile(b2);
    if (bat !== undefined) {
      if (bat.returnBatProfile().returnOnstrike()) {
        return '*';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  returnBattingListScores(): Array<[string, string, string]> {
    let list: Array<[string, string, string]> = [];
    this.playerMap.forEach((profile, name) => {
      let stat = profile.returnBatProfile();
      let dismissal = stat.returnScore()[0];
      let score = stat.returnScore()[1];
      let pName = name;
      //list.push([pName, dismissal, score]);
    });
    return list;
  }
  returnBowlerListFigures(): Array<[string, string]> {
    let list: Array<[string, string]> = [];
    this.playerMap.forEach((pProfile, pName) => {
      let stat = pProfile.returnBowlProfile();
      let name = pName;
      if (stat.returnOversBowled() > 0 || stat.returnDeliveriesBowled() > 0) {
        //list.push([name, stat.returnFigures()[0]]);
      }
    });
    return list;
  }
  returnExtras(): string {
    let bWd = "wd " + this.teamBowlerWides().toString();
    let tNb = "nb " + this.teamBowlerNb().toString();
    let teamExtras = this.teamExtras().returnTeamExtras().toString();
    return bWd + " " + tNb + " " + teamExtras;
  }
}
