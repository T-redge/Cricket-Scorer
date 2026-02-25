import { Component, computed, inject, signal } from '@angular/core';
import { App } from '../app';

@Component({
  selector: 'app-scorer-ui',
  imports: [],
  templateUrl: './scorer-ui.html',
  styleUrl: './scorer-ui.css',
})
export class ScorerUi {
  teams = inject(App);
  tossWinner = signal(this.returnTossWinner());
  homeTeam = signal(this.teams.homeTeamName);
  awayTeam = signal(this.teams.awayTeamName);

  batTeam = signal(this.returnBattingTeam());
  bowlTeam = signal(this.returnBowlingTeam());

  homeTeamScore = computed(() => this.teams.returnHomeTeam().returnTeamScore());
  awayTeamScore = computed(() => this.teams.returnAwayTeam().returnTeamScore());

  oversHomeBowled = computed(() => this.teams.returnHomeTeam().returnOversScore());
  oversAwayBowled = computed(() => this.teams.returnAwayTeam().returnOversScore());

  batOne = computed(() => this.teams.returnBattingTeam().returnBatterOne());
  batTwo = computed(() => this.teams.returnBattingTeam().returnBatterTwo());

  bowlOne = computed(() => this.teams.returnBowlingTeam().returnCurrentBowler());
  bowlTwo = computed(() => this.teams.returnBowlingTeam().returnLastBowler());

  returnTossWinner(): string {
    if (this.teams.returnHomeTeam().returnTossResult()) {
      return this.teams.homeTeamName;
    } else {
      return this.teams.awayTeamName;
    }
  }
  returnBattingTeam(): string {
    if (this.teams.returnHomeTeam().returnTeamRole() === 'Batting') {
      return this.teams.homeTeamName;
    } else {
      return this.teams.awayTeamName;
    }
  }
  returnBowlingTeam(): string {
    if (this.batTeam() === this.homeTeam()) {
      return this.awayTeam();
    } else {
      return this.homeTeam();
    }
  }
  returnBatterStats(name: string): string {
    if (!(name === '')) {
      let stats = this.teams.teamsMap.get(this.batTeam())!.returnPlayerProfile(name)!.batProfile.returnScore();
      return stats;
    } else {
      return '';
    }
  }
  returnBowlerStats(name: string): string {
    if (!(name === '')) {
      let stats = this.teams.teamsMap.get(this.bowlTeam())!.returnPlayerProfile(name)!.returnBowlProfile().returnScore();
      return stats;
    } else {
      return '';
    }
  }
  returnBowlerExtras(name: string): string {
    if (!(name === '')) {
      let stats = this.teams.teamsMap.get(this.bowlTeam())!.returnPlayerProfile(name)!.returnBowlProfile().returnExtras();
      return stats;
    } else {
      return '';
    }
  }
}
