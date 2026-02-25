import { Component, signal, type OnInit } from '@angular/core';
import { EventBtns, MatchEvents } from './event-btns/event-btns';
import { load_teamone_file, load_teamtwo_file, initRustWasm } from 'wasm-scorer';
import { TeamlistUi } from './teamlist-ui/teamlist-ui';
import { CointossUi } from './cointoss-ui/cointoss-ui';
import { RoleselectUi } from './roleselect-ui/roleselect-ui';
import { Team } from './team-class/team-class';
import { ScorerUi } from './scorer-ui/scorer-ui';
import { SelectPlayerForm } from './select-player-form/select-player-form';
import { SelectOpenersForm } from './select-openers-form/select-openers-form';
import { ExtraForm } from './extra-form/extra-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventBtns, TeamlistUi, CointossUi, RoleselectUi, ScorerUi, SelectPlayerForm, SelectOpenersForm, ExtraForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  teamsMap: Map<string, Team> = new Map;

  homeTeamName = "Edgewater";
  awayTeamName = "Morley";

  ngOnInit() {
    initRustWasm();
  }

  loadTeams() {
    this.teamsMap.set(this.homeTeamName, new Team);
    this.teamsMap.set(this.awayTeamName, new Team);

    this.teamsMap.get(this.homeTeamName)!.loadPlayers(load_teamone_file());
    this.teamsMap.get(this.awayTeamName)!.loadPlayers(load_teamtwo_file());
  } receiveOpenerNames(namesEv: [string, string]) {
    let batTeam = this.returnBattingTeam();
    batTeam.setBatterOne(namesEv[0]);
    batTeam.setBatterTwo(namesEv[1]);
  }
  receivePlayerName(nameEv: string) {
    let bowlTeam = this.returnBowlingTeam();
    if (this.formSelect() === 'Bowl') {
      bowlTeam.setLastBowler(bowlTeam.returnCurrentBowler());
      bowlTeam.setCurrentBowler(nameEv);
    }
  }
  receiveExtraType(extraEv: string) {
    this.extraFormSelect.set(extraEv);
  }
  returnHomeTeam(): Team {
    return this.teamsMap.get(this.homeTeamName)!;
  }
  returnAwayTeam(): Team {
    return this.teamsMap.get(this.awayTeamName)!;
  }
  returnBattingTeam(): Team {
    let ht = this.returnHomeTeam().returnTeamRole();
    if (ht === 'Batting') {
      return this.returnHomeTeam();
    } else {
      return this.returnAwayTeam();
    }
  }
  returnBowlingTeam(): Team {
    let ht = this.returnHomeTeam().returnTeamRole();
    if (ht === 'Bowling') {
      return this.returnHomeTeam();
    } else {
      return this.returnAwayTeam();
    }
  }

  newGame = signal(false);
  startNewGame() {
    this.loadTeams();
    this.newGame.set(true);
  }
  newInnings = signal(false);

  showTeamsUi = signal(true);
  showCoinTossUi = signal(false);
  showRoleSelectionUi = signal(false);
  showBtnUi = signal(false);
  showSelectOpeningBatsForm = signal(false);
  showSelectPlayerForm = signal(false);
  formSelect = signal('Bowl');

  extraFormSelect = signal('');
  showExtraForm = signal(false);
  extraFormTotal = signal(0);
  retrieveExtraAmount(extraEv: number) {
    this.extraFormTotal.set(extraEv);
    return extraEv;
  }

  event = signal('');

  eventOccured(event: MatchEvents) {
    let batTeam = this.returnBattingTeam();
    let bowlTeam = this.returnBowlingTeam();
    let bowler = this.returnBowlingTeam().returnCurrentBowler();
    this.event.set(event);
    switch (event) {
      case MatchEvents.DotBall: {
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        bowlTeam.teamDeliveryBowled();
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().deliveryCompleted();
        break;
      }
      case MatchEvents.OneRun: {
        let runsScored = 1;
        batTeam.teamRunScored(runsScored);
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        batTeam.returnOnStrikePlayer().returnBatProfile().addRunScored(runsScored);
        batTeam.strikeRotated();
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.runsConceded(runsScored);
        break;
      }
      case MatchEvents.TwoRuns: {
        let runsScored = 2;
        batTeam.teamRunScored(runsScored);
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        batTeam.returnOnStrikePlayer().returnBatProfile().addRunScored(runsScored);
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.runsConceded(runsScored);
        break;
      }
      case MatchEvents.ThreeRuns: {
        let runsScored = 3;
        batTeam.teamRunScored(runsScored);
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        batTeam.returnOnStrikePlayer().returnBatProfile().addRunScored(runsScored);
        batTeam.strikeRotated();
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.runsConceded(runsScored);
        break;
      }
      case MatchEvents.FourRuns: {
        let runsScored = 4;
        batTeam.teamRunScored(runsScored);
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        batTeam.returnOnStrikePlayer().returnBatProfile().addRunScored(runsScored);
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.runsConceded(runsScored);
        break;
      }
      case MatchEvents.SixRuns: {
        let runsScored = 6;
        batTeam.teamRunScored(runsScored);
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        batTeam.returnOnStrikePlayer().returnBatProfile().addRunScored(runsScored);
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.runsConceded(runsScored);
        break;
      }
      case MatchEvents.Extra: {
        this.showExtraForm.set(true);
        break;
      }
      case MatchEvents.Wides: {
        let totalWides = this.extraFormTotal();
        batTeam.teamRunScored(totalWides);
        if (totalWides % 2 === 0) {
          batTeam.strikeRotated();
        }
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.wideBowled(totalWides);
        this.showExtraForm.set(false);
        break;
      }
      case MatchEvents.Noball: {
        let nb = 1;
        let additionalRuns = 0;
        batTeam.teamRunScored(nb);
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.noballBowled(additionalRuns);
        break;
      }
      case MatchEvents.NbRuns: {
        let nb = 1;
        let runsScored = this.extraFormTotal();
        batTeam.teamRunScored(nb + runsScored);
        batTeam.returnOnStrikePlayer().returnBatProfile().addRunScored(runsScored);
        if (runsScored % 2 !== 0) {
          batTeam.strikeRotated();
        }
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.noballBowled(runsScored);
        this.showExtraForm.set(false);
        break;
      }
      case MatchEvents.Byes: {
        let totalByes = this.extraFormTotal();

        batTeam.teamRunScored(totalByes);
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        if (totalByes % 2 !== 0) {
          batTeam.strikeRotated();
        }
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        this.showExtraForm.set(false);
        break;
      }
      case MatchEvents.Legbyes: {
        let totalLegbyes = this.extraFormTotal();
        batTeam.teamRunScored(totalLegbyes);
        batTeam.returnOnStrikePlayer().returnBatProfile().addDeliveryFaced();
        if (totalLegbyes % 2 !== 0) {
          batTeam.strikeRotated();
        }
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        this.showExtraForm.set(false);
        break;
      }
      case MatchEvents.Bowled: {
        batTeam.teamWicketDismissal();
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.wicketTaken();
        break;
      }
      case MatchEvents.Caught: {
        batTeam.teamWicketDismissal();
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.wicketTaken();
        break;
      }
      case MatchEvents.Lbw: {
        batTeam.teamWicketDismissal();
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.wicketTaken();
        break;
      }
      case MatchEvents.Stumped: {
        batTeam.teamWicketDismissal();
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        currBowler.wicketTaken();
        break;
      }
      case MatchEvents.Runout: {
        batTeam.teamWicketDismissal();
        bowlTeam.teamDeliveryBowled();
        let currBowler = bowlTeam.returnPlayerProfile(bowler).returnBowlProfile();
        currBowler.deliveryCompleted();
        break;
      }
      case MatchEvents.MatchStart: {
        this.showTeamsUi.set(false);
        this.showCoinTossUi.set(true);
        break;
      }
      case MatchEvents.HomeCoinWin: {

        this.returnHomeTeam().setTossResult(true);
        this.returnAwayTeam().setTossResult(false);

        this.showCoinTossUi.set(false);
        this.showRoleSelectionUi.set(true);
        break;
      }
      case MatchEvents.AwayCoinWin: {
        this.returnHomeTeam().setTossResult(false);
        this.returnAwayTeam().setTossResult(true);
        this.showCoinTossUi.set(false);
        this.showRoleSelectionUi.set(true);
        break;
      }
      case MatchEvents.RoleBat: {
        if (this.returnHomeTeam().returnTossResult()) {
          this.returnHomeTeam().setTeamRole(MatchEvents.RoleBat);
          this.returnAwayTeam().setTeamRole(MatchEvents.RoleBowl);
        } else {
          this.returnHomeTeam().setTeamRole(MatchEvents.RoleBowl);
          this.returnAwayTeam().setTeamRole(MatchEvents.RoleBat);
        }
        this.showRoleSelectionUi.set(false);
        this.newInnings.set(true);
        this.showSelectOpeningBatsForm.set(true);
        break;
      }
      case MatchEvents.RoleBowl: {
        if (this.returnHomeTeam().returnTossResult()) {
          this.returnHomeTeam().setTeamRole(MatchEvents.RoleBowl);
          this.returnAwayTeam().setTeamRole(MatchEvents.RoleBat);
        } else {
          this.returnHomeTeam().setTeamRole(MatchEvents.RoleBat);
          this.returnAwayTeam().setTeamRole(MatchEvents.RoleBowl);
        }
        this.showRoleSelectionUi.set(false);
        this.newInnings.set(true);
        this.showSelectOpeningBatsForm.set(true);
        break;
      }
      case MatchEvents.OpenersChosen: {
        this.showSelectOpeningBatsForm.set(false);
        this.showSelectPlayerForm.set(true);
        break;
      }
      case MatchEvents.PlayerChosen: {
        this.showSelectPlayerForm.set(false);
        this.showBtnUi.set(true);
        break;
      }
      case MatchEvents.OverComplete: {
        break;
      }
    }
  }
}

