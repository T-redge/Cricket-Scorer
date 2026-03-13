import { Component, computed, input, InputSignal, signal } from '@angular/core';
import { Team } from '../team-class/team-class';
import { OverClass } from '../over-class/over-class';
import { CommentaryUi } from '../commentary-ui/commentary-ui';
import { Roles } from '../roleselect-ui/roleselect-ui';
import { InningsClass } from '../innings-class/innings-class';

@Component({
  selector: 'app-scorer-ui',
  imports: [CommentaryUi],
  templateUrl: './scorer-ui.html',
  styleUrl: './scorer-ui.css',
})
export class ScorerUi {
  homeTeam: InputSignal<Team | undefined> = input();
  awayTeam: InputSignal<Team | undefined> = input();
  overCount: InputSignal<InningsClass | undefined> = input();
  deliveryCount: InputSignal<OverClass | undefined> = input();

  tossWinner = signal(this.returnTossWinner());

  batTeam = computed(() => this.returnBattingTeamName());
  bowlTeam = computed(() => this.returnBowlingTeamName());

  homeTeamScore = computed(() => {
    let ht = this.homeTeam();
    if (ht !== undefined) {
      return ht.returnTeamScore();
    } else {
      return "w-runs";
    }
  });
  awayTeamScore = computed(() => {
    let at = this.homeTeam();
    if (at !== undefined) {
      return at.returnTeamScore();
    } else {
      return "w-runs";
    }
  });

  oversBowled = computed(() => {
    let over = this.overCount();
    let delivery = this.deliveryCount();
    if (over !== undefined && delivery !== undefined) {
      return over.returnOverCount() + "." + delivery.returnDeliveryCount();
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

  bowlOne = computed(() => {
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

    if (ht !== undefined && at !== undefined) {
      if (ht.returnTossResult()) {
        return ht.returnTeamName();
      } else {
        return at.returnTeamName();
      }
    } else {
      return "Default Winner";
    }
  }
  returnHomeTeamName(): string {
    let ht = this.homeTeam();
    if (ht !== undefined) {
      return ht.returnTeamName();
    } else {
      return "Default Home";
    }
  }
  returnAwayTeamName(): string {
    let at = this.awayTeam();
    if (at !== undefined) {
      return at.returnTeamName();
    } else {
      return "Default Away";
    }
  }
  returnBattingTeamName(): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bat) {
        return ht.returnTeamName();
      } else {
        return at.returnTeamName();
      }
    } else {
      return "Default Team";
    }
  }
  returnBowlingTeamName(): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();

    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bowl) {
        return ht.returnTeamName();
      } else {
        return at.returnTeamName();
      }
    } else {
      return "Default Team";
    }
  }
  returnBattingTeam(): Team | undefined {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bat) {
        return ht;
      } else {
        return at;
      }
    } else {
      return undefined;
    }
  }
  returnBowlingTeam(): Team | undefined {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bowl) {
        return ht;
      } else {
        return at;
      }
    } else {
      return undefined;
    }
  }
  returnBatterStats(name: string): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    let pName = name;
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bat) {
        let pStats = ht.returnPlayerProfile(pName).returnBatProfile().returnScore();
        return pStats;
      } else {
        let pStats = at.returnPlayerProfile(pName).returnBatProfile().returnScore();
        return pStats;
      }
    } else {
      return "s(b)";
    }
  }
  returnBowlerStats(name: string): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    let pName = name;
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bowl) {
        let pStats = ht.returnPlayerProfile(pName);
        if (pStats !== undefined) {
          return pStats.returnBowlProfile().returnScore();
        } else {
          return " ";
        }
      } else {
        let pStats = at.returnPlayerProfile(pName);
        if (pStats !== undefined) {
          return pStats.returnBowlProfile().returnScore();
        } else {
          return " "
        }
      }
    } else {
      return "o-m-w-r";
    }
  }
  returnBowlerExtras(name: string): string {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    let pName = name;
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bowl) {
        let pStats = ht.returnPlayerProfile(pName);
        if (pStats !== undefined) {
          return pStats.returnBowlProfile().returnExtras();
        } else {
          return " ";
        }
      } else {
        let pStats = at.returnPlayerProfile(pName);
        if (pStats !== undefined) {
          return pStats.returnBowlProfile().returnExtras();
        } else {
          return " ";
        }
      }
    } else {
      return "wd(w) nb(n)";
    }
  }
}
