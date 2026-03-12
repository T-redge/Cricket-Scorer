import { Component, EventEmitter, Output, signal, WritableSignal, type OnInit } from '@angular/core';
import { load_teamone_file, load_teamtwo_file, initRustWasm } from 'wasm-scorer';
import { TeamlistUi } from './teamlist-ui/teamlist-ui';
import { CointossUi } from './cointoss-ui/cointoss-ui';
import { RoleselectUi } from './roleselect-ui/roleselect-ui';
import { Team } from './team-class/team-class';
import { ScorerUi } from './scorer-ui/scorer-ui';
import { SelectPlayerForm } from './select-player-form/select-player-form';
import { SelectOpenersForm } from './select-openers-form/select-openers-form';
import { ExtraForm } from './extra-form/extra-form';
import { EventButtonsUi } from './event-buttons-ui/event-buttons-ui';
import { DeliveryEvents, DeliveryType } from './event-class/delivery-events';
import { MatchEvents } from './event-class/match-events';
import { RunForm } from './run-form/run-form';
import { WicketForm } from './wicket-form/wicket-form';
import { MatchClass, NumberOvers } from './match-class/match-class';
import { InningsClass } from './innings-class/innings-class';
import { OverClass } from './over-class/over-class';
import { EndOverUi } from './end-over-ui/end-over-ui';
import { EndInningUi } from './end-inning-ui/end-inning-ui';
import { CommentaryUi } from './commentary-ui/commentary-ui';
import { MatchEventTeams, MatchSettingsForm, MatchSetting } from './match-settings-form/match-settings-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatchSettingsForm, CommentaryUi, EndInningUi, EndOverUi, WicketForm, RunForm, EventButtonsUi, TeamlistUi, CointossUi, RoleselectUi, ScorerUi, SelectPlayerForm, SelectOpenersForm, ExtraForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  ngOnInit() {
    initRustWasm();
  }

  homeTeamName: WritableSignal<string> = signal('');
  awayTeamName: WritableSignal<string> = signal('');
  maxOvers: WritableSignal<NumberOvers> = signal(NumberOvers.Default);

  currentMatch: WritableSignal<MatchClass> = signal(new MatchClass());
  currentInnings: WritableSignal<InningsClass> = signal(new InningsClass(NumberOvers.Default));
  currentOver: WritableSignal<OverClass> = signal(new OverClass());

  teamsMap: WritableSignal<Map<string, Team>> = signal(new Map);

  newGame = signal(false);
  newMatchStarted = signal(false);
  newInningsStarted = signal(false);
  showEndInningUi = signal(false);
  currentDelivery = signal('');
  deliveryComplete = signal(false);
  showTeamsUi = signal(false);
  showCoinTossUi = signal(false);
  showRoleSelectionUi = signal(false);
  showBtnUi = signal(false);
  showSelectOpeningBatsForm = signal(false);
  showSelectPlayerForm = signal(false);
  formSelect = signal('Bowl');
  showExtraForm = signal(false);
  extraFormTotal = signal(0);
  showEndOverUi = signal(false);
  showRunForm = signal(false);
  runFormTotal = signal(0);
  showWicketForm = signal(false);
  wicketFormDismissal = signal('');
  event = signal('');

  setMatchSettings(settings: MatchSetting) {
    let ht = settings.home;
    let at = settings.away;
    let ov = settings.overs;

    this.homeTeamName.set(ht);
    this.awayTeamName.set(at);
    this.maxOvers.set(ov);
  }
  loadTeams() {
    this.teamsMap().set(this.homeTeamName(), new Team);
    this.teamsMap().set(this.awayTeamName(), new Team);
    this.teamsMap().get(this.homeTeamName())!.setTeamName(this.homeTeamName());
    this.teamsMap().get(this.awayTeamName())!.setTeamName(this.awayTeamName());
    this.teamsMap().get(this.homeTeamName())!.loadPlayers(load_teamone_file());
    this.teamsMap().get(this.awayTeamName())!.loadPlayers(load_teamtwo_file());
  }
  startNewGame() {
    this.loadTeams();
    this.newGame.set(true);
    this.showTeamsUi.set(true);
  }
  receiveOpenerNames(namesEv: [string, string]) {
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
  returnHomeTeam(): Team {
    let name = this.homeTeamName();
    return this.teamsMap().get(name)!;
  }
  returnAwayTeam(): Team {
    let name = this.awayTeamName();
    return this.teamsMap().get(name)!;
  }
  returnBattingTeam(): Team {
    let ht = this.returnHomeTeam()!.returnTeamRole();
    if (ht === 'Batting') {
      return this.returnHomeTeam()!;
    } else {
      return this.returnAwayTeam();
    }
  }
  returnBowlingTeam(): Team {
    let ht = this.returnHomeTeam()!.returnTeamRole();
    if (ht === 'Bowling') {
      return this.returnHomeTeam()!;
    } else {
      return this.returnAwayTeam();
    }
  }
  returnCurrentOver(): OverClass {
    return this.currentOver();
  }
  returnOverCount(): string {
    let overs = this.currentInnings().returnOverCount().toString();
    let deliveries = this.currentOver().returnDeliveryCount().toString();
    let count = overs + '.' + deliveries;

    return count;
  }
  retrieveExtraAmount(extraEv: number) {
    this.extraFormTotal.set(extraEv);
    return extraEv;
  }
  matchEvents(matchEv: MatchEventTeams) {
    console.log(matchEv);
    let mEv = matchEv.event;
    let data = matchEv.data;
    let ht = this.returnHomeTeam()!;
    let at = this.returnAwayTeam()!;
    switch (mEv) {
      case MatchEvents.TeamsSelected: {
        this.setMatchSettings(data);
        this.startNewGame();
        break;
      }
      case MatchEvents.MatchStart: {
        this.showTeamsUi.set(false);
        this.showCoinTossUi.set(true);
        break;
      }
      case MatchEvents.HomeCoinWin: {
        ht.setTossResult(true);
        this.showCoinTossUi.set(false);
        this.showRoleSelectionUi.set(true);
        break;
      }
      case MatchEvents.AwayCoinWin: {
        at.setTossResult(true);
        this.showCoinTossUi.set(false);
        this.showRoleSelectionUi.set(true);
        break;
      }
      case MatchEvents.RoleBat: {
        if (ht.returnTossResult()) {
          ht.setTeamRole("Batting");
          at.setTeamRole("Bowling");
        } else {
          ht.setTeamRole("Bowling");
          at.setTeamRole("Batting");
        }
        this.showRoleSelectionUi.set(false);
        this.newInningsStarted.set(true);
        this.showSelectOpeningBatsForm.set(true);
        break;
      }
      case MatchEvents.RoleBowl: {
        if (ht.returnTossResult()) {
          ht.setTeamRole('Bowling');
          at.setTeamRole('Batting');
        } else {
          ht.setTeamRole('Batting');
          at.setTeamRole('Bowling');
        }
        this.showRoleSelectionUi.set(false);
        this.newInningsStarted.set(true);
        this.showSelectOpeningBatsForm.set(true);
        break;
      }
      case MatchEvents.OpenersChosen: {
        this.showSelectOpeningBatsForm.set(false);
        this.showSelectPlayerForm.set(true);
        break;
      }
      case MatchEvents.BatterChosen: {
        this.showSelectPlayerForm.set(false);
        this.showBtnUi.set(true);
        break;
      }
      case MatchEvents.BowlerChosen: {
        this.showSelectPlayerForm.set(false);
        this.showBtnUi.set(true);
        let bowlerName = this.returnBowlingTeam().returnCurrentBowler();
        this.currentOver().setBowler(bowlerName);
        break;
      }
      case MatchEvents.FielderChosen: {
        this.showSelectPlayerForm.set(false);
        this.showBtnUi.set(true);
        break;
      }
      case MatchEvents.InningsComplete: {
        this.showEndOverUi.set(false);
        this.showEndInningUi.set(true);
        break;
      }
      case MatchEvents.NewInning: {
        this.showEndInningUi.set(false);
        let ht = this.returnHomeTeam()!;
        let at = this.returnAwayTeam()!;
        if (ht.returnTeamRole() === 'Batting') {
          ht.setTeamRole('Bowling');
          at.setTeamRole('Batting');
        } else {
          ht.setTeamRole('Batting');
          at.setTeamRole('Bowling');
        }
        this.currentOver.set(new OverClass());
        this.currentInnings.set(new InningsClass(2));
        this.showSelectOpeningBatsForm.set(true);
        break;
      }
      case MatchEvents.OverComplete: {
        this.currentInnings().overCompleted();
        let bowlName = this.returnBowlingTeam().returnCurrentBowler();
        this.returnBowlingTeam().returnPlayerProfile(bowlName).returnBowlProfile().overBowled();
        this.showEndOverUi.set(true);
        break;
      }
      case MatchEvents.DeliveryComplete: {
        break;
      }
      case MatchEvents.NewOver: {
        this.showEndOverUi.set(false);
        this.formSelect.set('Bowl');
        this.showSelectPlayerForm.set(true);
        this.currentOver.set(new OverClass());
        break;
      }
    }
  }
  deliveryEvent(delivery: DeliveryType) {
    switch (delivery.event) {
      case DeliveryEvents.Default: {
        break;
      }
      case DeliveryEvents.DotBall: {
        break;
      }
      case DeliveryEvents.Runs: {
        this.showRunForm.set(true);
        break;
      }
      case DeliveryEvents.Wide: {
        break;
      }
      case DeliveryEvents.Noball: {
        break;
      }
      case DeliveryEvents.Byes: {
        break;
      }
      case DeliveryEvents.Legbyes: {
        break;
      }
      case DeliveryEvents.Bowled: {
        break;
      }
      case DeliveryEvents.Caught: {
        break;
      }
      case DeliveryEvents.Lbw: {
        break;
      }
      case DeliveryEvents.Stumped: {
        break;
      }
      case DeliveryEvents.Runout: {
        break;
      }
    }
  }
}

