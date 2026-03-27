import { Component, input, InputSignal } from '@angular/core';
import { Team } from '../team-class/team-class';

@Component({
  selector: 'app-end-match-ui',
  imports: [],
  templateUrl: './end-match-ui.html',
  styleUrl: './end-match-ui.css',
})
export class EndMatchUi {
  homeTeam: InputSignal<Team> = input(new Team("Home Team"));
  awayTeam: InputSignal<Team> = input(new Team("Away Team"));

  returnHomeTeam(): Team {
    let ht = this.homeTeam();
    return ht;
  }
  returnAwayTeam(): Team {
    let at = this.awayTeam();
    return at;
  }
  returnHomeTeamOvers(): string {
    let ht = this.returnHomeTeam();
    return ht.returnOversScore();
  }
  returnAwayTeamOvers(): string {
    let at = this.returnAwayTeam();
    return at.returnOversScore();
  }
  returnHomeTeamName(): string {
    let ht = this.returnHomeTeam();
    return ht.returnTeamName();
  }
  returnAwayTeamName(): string {
    let at = this.returnAwayTeam();
    return at.returnTeamName();
  }
  returnHomeTeamBatting(): Array<[string, string, string]> {
    let ht = this.returnHomeTeam();
    return ht.returnBattingListScores();
  }
  returnHomeTeamBowling(): Array<[string, string]> {
    let ht = this.returnHomeTeam();
    return ht.returnBowlerListFigures();
  }
  returnHomeTeamExtras(): string {
    let ht = this.returnHomeTeam();
    return ht.returnExtras();
  }
  returnAwayTeamBatting(): Array<[string, string, string]> {
    let at = this.returnAwayTeam();
    return at.returnBattingListScores()
  }
  returnAwayTeamBowling(): Array<[string, string]> {
    let at = this.returnAwayTeam();
    return at.returnBowlerListFigures();
  }
  returnAwayTeamExtras(): string {
    let at = this.returnAwayTeam();
    return at.returnExtras();
  }
  returnHomeTeamScore(): string {
    let ht = this.returnHomeTeam();
    return ht.returnTeamScore();
  }
  returnAwayTeamScore(): string {
    let at = this.returnAwayTeam();
    return at.returnTeamScore();
  }
  returnHomeTeamFow(): Array<string> {
    let ht = this.returnHomeTeam();
    let fall: Array<string> = new Array;
    ht.returnFallofWicket().forEach(fow => {
      let number = fow[0];
      let runs = fow[1];
      let player = fow[2];
      let line = number + "/" + runs + ": " + player;
      fall.push(line);
    });
    return fall;
  }
  returnAwayTeamFow(): Array<string> {
    let at = this.returnAwayTeam();
    let fall: Array<string> = new Array;
    at.returnFallofWicket().forEach(fow => {
      let number = fow[0];
      let runs = fow[1];
      let player = fow[2];
      let line = number + "-" + runs + ": " + player;
      fall.push(line);
    });
    return fall;
  }
}
