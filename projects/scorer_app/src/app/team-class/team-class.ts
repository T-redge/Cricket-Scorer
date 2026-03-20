import { computed, isWritableSignal, signal, WritableSignal, ɵɵpureFunction0 } from "@angular/core";
import { PlayerClass } from "../player-class/player-class";
import { Roles } from "../roleselect-ui/roleselect-ui";
import { TeamExtras } from "../extra-class/extra-class";

export class Team {
  private teamName = signal('');
  private tossWon = signal(false);
  private teamRole: WritableSignal<Roles> = signal(Roles.Default);
  private playerMap: Map<string, PlayerClass> = new Map;

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
  private teamWickets = computed(() => {
    let wickets = 0;
    this.playerMap.forEach((profile) => {
      let w = profile.returnBowlProfile().returnWicketsTaken();
      wickets += w;
    });
    return wickets;
  });

  private batterOne = signal('');
  private batterTwo = signal('');

  private currentBowler = signal('');
  private lastBowler = signal('');

  setTeamName(name: string) {
    this.teamName.set(name);
  }
  returnTeamName(): string {
    return this.teamName();
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
    return this.playerMap.get(name)!;
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
  returnBattingListScores(): Array<[string, string]> {
    let list: Array<[string, string]> = [];
    this.playerMap.forEach((profile, name) => {
      let stat = profile.returnBatProfile();
      let pName = name;
      list.push([pName, stat.returnScore()]);
    });
    return list;
  }
  returnBowlerListFigures(): Array<[string, string]> {
    let list: Array<[string, string]> = [];
    this.playerMap.forEach((pProfile, pName) => {
      let stat = pProfile.returnBowlProfile();
      let name = pName;
      if (stat.returnOversBowled() > 0) {
        list.push([name, stat.returnFigures()[0]]);
      }
    });
    return list;
  }
  returnExtras(): string {
    let teamExtras = this.teamExtras().returnTeamExtras();
    let wd = 0;
    let n = 0;
    this.playerMap.forEach((profile) => {
      let wides = profile.returnBowlProfile().returnExtras().returnWideCount();
      wd += wides;
      let nb = profile.returnBowlProfile().returnExtras().returnNbCount();
      n += nb;
    });
    let bowlerExtras = 'w ' + wd.toString() + ' nb ' + n.toString();
    return bowlerExtras + ' ' + teamExtras;
  }
}
