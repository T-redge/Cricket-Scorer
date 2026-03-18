import { computed, signal, WritableSignal } from "@angular/core";
import { PlayerClass } from "../player-class/player-class";
import { Roles } from "../roleselect-ui/roleselect-ui";
import { TeamExtras } from "../extra-class/extra-class";

export class Team {
  private teamName = signal('');
  private tossWon = signal(false);
  private teamRole: WritableSignal<Roles> = signal(Roles.Default);
  private playerMap: Map<string, PlayerClass> = new Map;


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
    this.playerMap.forEach((profile) => {
      let r = profile.returnBatProfile().returnRunsScored();
      runs += r;
    });
    return runs;
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

  returnOnStrikePlayer(): PlayerClass {
    let b1 = this.batterOne();
    let b2 = this.batterTwo();

    //if (this.returnPlayerProfile(b1).batProfile.onStrike()) {
    //  return this.returnPlayerProfile(b1);
    //} else {
    return this.returnPlayerProfile(b2);
    //}
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
}
