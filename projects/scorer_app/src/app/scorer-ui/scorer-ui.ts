import { Component, computed, input, InputSignal, signal } from '@angular/core';
import { Team } from '../team-class/team-class';
import { OverClass } from '../over-class/over-class';
import { CommentaryUi } from '../commentary-ui/commentary-ui';
import { Roles } from '../roleselect-ui/roleselect-ui';
import { CommentaryType } from '../commentary-class/commentary-class';
import { DeliveryUi } from '../delivery-ui/delivery-ui';

@Component({
  selector: 'app-scorer-ui',
  imports: [CommentaryUi, DeliveryUi],
  templateUrl: './scorer-ui.html',
  styleUrl: './scorer-ui.css',
})
export class ScorerUi {
  homeTeam: InputSignal<Team> = input(new Team("Home Team"));
  awayTeam: InputSignal<Team> = input(new Team("Away Team"));
  tossWinner = computed(() => this.returnTossWinner());
  comms: InputSignal<Array<CommentaryType>> = input(new Array);
  batTeam = computed(() => this.returnBattingTeamName());
  bowlTeam = computed(() => this.returnBowlingTeamName());
  over: InputSignal<OverClass | undefined> = input();

  homeTeamScore = computed(() => {
    let ht = this.homeTeam();
    if (ht !== undefined) {
      return ht.returnTeamScore();
    } else {
      return "w-runs";
    }
  });
  awayTeamScore = computed(() => {
    let at = this.awayTeam();
    if (at !== undefined) {
      return at.returnTeamScore();
    } else {
      return "w-runs";
    }
  });

  oversBowled = computed(() => {
    let over = this.returnBowlingTeam();
    if (over !== undefined) {
      return over.returnOversScore();
    } else {
      return "o.b";
    }
  });
  batOne = computed(() => {
    let bt = this.returnBattingTeam();
    if (bt !== undefined) {
      return bt.returnBatterOne();
    } else {
      return "Default Batter";
    }
  });
  batTwo = computed(() => {
    let bt = this.returnBattingTeam();
    if (bt !== undefined) {
      return bt.returnBatterTwo();
    } else {
      return "Default Batter";
    }
  });
  bowler = computed(() => {
    let bt = this.returnBowlingTeam();
    if (bt !== undefined) {
      return bt.returnCurrentBowler();
    } else {
      return "Default Bowler";
    }
  });
  returnTossWinner(): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTossResult()) {
      return ht.returnTeamName();
    } else {
      return at.returnTeamName();
    }
  }
  returnHomeTeamName(): string {
    let ht = this.homeTeam();
    return ht.returnTeamName();
  }
  returnAwayTeamName(): string {
    let at = this.awayTeam();
    return at.returnTeamName();
  }
  returnBattingTeamName(): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bat) {
      return ht.returnTeamName();
    } else {
      return at.returnTeamName();
    }
  }

  returnBowlingTeamName(): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bowl) {
      return ht.returnTeamName();
    } else {
      return at.returnTeamName();
    }
  }
  returnBattingTeam(): Team {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bat) {
      return ht;
    } else {
      return at;
    }
  }
  returnBowlingTeam(): Team {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bowl) {
      return ht;
    } else {
      return at;
    }
  }
  returnBatterScores(name: string): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    let pName = name;
    if (ht.returnTeamRole() === Roles.Bat) {
      let pStats = ht.returnPlayerProfile(pName).returnBatProfile().returnScore();
      return pStats[1];
    } else {
      let pStats = at.returnPlayerProfile(pName).returnBatProfile().returnScore();
      return pStats[1];
    }
  }
  returnBowlerFigures(name: string): [string, string] {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    let pName = name;
    if (ht.returnTeamRole() === Roles.Bowl) {
      let pStats = ht.returnPlayerProfile(pName);
      if (pStats !== undefined) {
        return pStats.returnBowlProfile().returnFigures();
      } else {
        return ["", ""];
      }
    } else {
      let pStats = at.returnPlayerProfile(pName);
      if (pStats !== undefined) {
        return pStats.returnBowlProfile().returnFigures();
      } else {
        return ["", ""];
      }
    }
  }
  returnExtras(): string {
    let batTeam = this.returnBattingTeam();
    let teamExtras = batTeam.returnExtras();
    return teamExtras;
  }
}
