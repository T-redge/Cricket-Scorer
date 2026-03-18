import { Component, input, InputSignal } from '@angular/core';
import { Team } from '../team-class/team-class';

@Component({
  selector: 'app-end-match-ui',
  imports: [],
  templateUrl: './end-match-ui.html',
  styleUrl: './end-match-ui.css',
})
export class EndMatchUi {
  homeTeam: InputSignal<Team | undefined> = input();
  awayTeam: InputSignal<Team | undefined> = input();

  returnHomeTeam(): Team {
    let ht = this.homeTeam();
    if (ht !== undefined) {
      return ht;
    } else {
      return new Team;
    }
  }
  returnAwayTeam(): Team {
    let at = this.awayTeam();
    if (at !== undefined) {
      return at;
    } else {
      return new Team;
    }
  }
  returnHomeTeamName(): string {
    let ht = this.returnHomeTeam();
    return ht.returnTeamName();
  }
  returnAwayTeamName(): string {
    let at = this.returnAwayTeam();
    return at.returnTeamName();
  }
  returnHomeTeamBatting(): Array<[string, string]> {
    let ht = this.returnHomeTeam();
    return ht.returnBattingListScores();
  }
  returnHomeTeamBowling(): Array<[string, string]> {
    let ht = this.returnHomeTeam();
    return ht.returnBowlerListFigures();
  }
  returnAwayTeamBatting(): Array<[string, string]> {
    let at = this.returnAwayTeam();
    return at.returnBattingListScores()
  }
  returnAwayTeamBowling(): Array<[string, string]> {
    let at = this.returnAwayTeam();
    return at.returnBowlerListFigures();
  }
  returnHomeTeamScore(): string {
    let ht = this.returnHomeTeam();
    return ht.returnTeamScore();
  }
  returnAwayTeamScore(): string {
    let at = this.returnAwayTeam();
    return at.returnTeamScore();
  }
}
