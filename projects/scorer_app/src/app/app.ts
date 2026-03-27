import { Component, computed, signal, WritableSignal, type OnInit } from '@angular/core';
import { TeamlistUi } from './teamlist-ui/teamlist-ui';
import { CointossUi, TossResult } from './cointoss-ui/cointoss-ui';
import { RoleChoice, Roles, RoleselectUi } from './roleselect-ui/roleselect-ui';
import { Team } from './team-class/team-class';
import { ScorerUi } from './scorer-ui/scorer-ui';
import { SelectPlayerForm } from './select-player-form/select-player-form';
import { OpeningBats, SelectOpenersForm } from './select-openers-form/select-openers-form';
import { ExtraForm } from './extra-form/extra-form';
import { EventButtonsUi } from './event-buttons-ui/event-buttons-ui';
import { DeliveryEvents, DeliveryType } from './event-class/delivery-events';
import { MatchEvents } from './event-class/match-events';
import { RunForm } from './run-form/run-form';
import { WicketForm } from './wicket-form/wicket-form';
import { MatchClass } from './match-class/match-class';
import { InningsClass } from './innings-class/innings-class';
import { OverClass } from './over-class/over-class';
import { EndOverUi } from './end-over-ui/end-over-ui';
import { EndInningUi } from './end-inning-ui/end-inning-ui';
import { MatchEventTeams, MatchSettingsForm, MatchSetting } from './match-settings-form/match-settings-form';
import { CommentaryClass, CommentaryType } from './commentary-class/commentary-class';
import { EndMatchUi } from './end-match-ui/end-match-ui';
import { UiEvent, UiEventType } from './event-class/ui-events';
import { fetch_from_db, fetch_players, TeamInterface } from './tauri-command-class/tauri-command-class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EndMatchUi, MatchSettingsForm, EndInningUi, EndOverUi, WicketForm, RunForm, EventButtonsUi, TeamlistUi, CointossUi, RoleselectUi, ScorerUi, SelectPlayerForm, SelectOpenersForm, ExtraForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  async ngOnInit() {
    const teams = await fetch_from_db();
    if (teams !== undefined) {
      teams.forEach(value => {
        this.teamList.update(arr => [...arr, value])
      });
    }
  }
  teamList: WritableSignal<Array<TeamInterface>> = signal([{ id: 0, name: "Default" }]);

  currentMatch: WritableSignal<MatchClass> = signal(new MatchClass({ id: 0, name: "" }, { id: 0, name: "" }, 0));
  currentInnings: WritableSignal<InningsClass> = signal(new InningsClass());
  currentOver: WritableSignal<OverClass> = signal(new OverClass());

  commentary: WritableSignal<Array<CommentaryType>> = signal(new Array);
  teamsMap: WritableSignal<Map<number, Team>> = signal(new Map);
  uiEventMap: WritableSignal<Map<string, boolean>> = signal(new Map);

  newGame = signal(false);
  newMatchStarted = signal(false);
  newInningsStarted = signal(false);
  showEndInningUi = signal(false);
  currentDelivery: WritableSignal<DeliveryType> = signal({
    batter: '', bowler: '', event: DeliveryEvents.Default, totalRuns: 0,
  });
  deliveryComplete = signal(false);
  showTeamsUi = signal(false);
  showCoinTossUi = signal(false);
  showRoleSelectionUi = signal(false);
  showBtnUi = signal(false);
  showSelectOpeningBatsForm = signal(false);
  showSelectPlayerForm = signal(false);
  formSelect: WritableSignal<Roles> = signal(Roles.Default);
  extraFormTotal = signal(0);
  showEndOverUi = signal(false);
  runFormTotal = signal(0);
  showEndMatchUi = signal(false);
  wicketFormDismissal = signal('');
  event = signal('');

  setMatchSettings(settings: MatchSetting) {
    let ht = settings.home;
    let at = settings.away;
    let ov = settings.overs;
    this.currentMatch.update(mc => mc = new MatchClass(ht, at, ov));
  }
  loadEventMap() {
    this.uiEventMap().set(UiEvent.ShowRunForm, false);
    this.uiEventMap().set(UiEvent.ShowExtraForm, false);
    this.uiEventMap().set(UiEvent.ShowWicketForm, false);
    this.uiEventMap().set(UiEvent.ShowSelectPlayerForm, false);
    this.uiEventMap().set(UiEvent.ShowOpeningBatsForm, false);
    this.uiEventMap().set(UiEvent.ShowTeamsUi, false);
    this.uiEventMap().set(UiEvent.ShowCoinTossUi, false);
    this.uiEventMap().set(UiEvent.ShowRoleSelectionUi, false);
    this.uiEventMap().set(UiEvent.ShowButtonUi, false);
    this.uiEventMap().set(UiEvent.ShowEndOverUi, false);
    this.uiEventMap().set(UiEvent.ShowEndInningUi, false);
    this.uiEventMap().set(UiEvent.ShowEndMatchUi, false);
  }
  changeUi(key: UiEvent, value: boolean) {
    this.uiEventMap().set(key, value);
  }
  loadUi(key: string): boolean {
    return this.uiEventMap().get(key)!;
  }
  async loadTeams() {
    let htName = this.currentMatch().returnHomeTeamName();
    let htId = this.currentMatch().returnHomeTeamId();
    let atName = this.currentMatch().returnAwayTeamName();
    let atId = this.currentMatch().returnAwayTeamId();

    let htPlayers = await fetch_players(htId);
    let atPlayers = await fetch_players(atId);
    this.teamsMap.update(curr => {
      const map = new Map(curr);

      map.set(htId, new Team(htName));
      map.set(atId, new Team(atName));

      map.get(htId)!.loadPlayers(htPlayers!);
      map.get(atId)!.loadPlayers(atPlayers!);
      return map;
    });
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
    if (this.formSelect() === Roles.Bowl) {
      bowlTeam.setLastBowler(bowlTeam.returnCurrentBowler());
      bowlTeam.setCurrentBowler(nameEv);
    }
  }
  returnHomeTeam(): Team {
    let id = this.currentMatch().returnHomeTeamId();
    return this.teamsMap().get(id)!;
  }
  returnAwayTeam(): Team {
    let id = this.currentMatch().returnAwayTeamId();
    return this.teamsMap().get(id)!;
  }
  returnBattingTeam(): Team {
    let ht = this.returnHomeTeam()!.returnTeamRole();
    if (ht === Roles.Bat) {
      return this.returnHomeTeam()!;
    } else {
      return this.returnAwayTeam();
    }
  }
  returnBowlingTeam(): Team {
    let ht = this.returnHomeTeam()!.returnTeamRole();
    if (ht === Roles.Bowl) {
      return this.returnHomeTeam()!;
    } else {
      return this.returnAwayTeam();
    }
  }
  returnTossWinner(): Team {
    let ht = this.returnHomeTeam();
    let at = this.returnAwayTeam();
    if (ht.returnTossResult()) {
      return ht;
    } else {
      return at;
    }
  }
  returnTossLoser(): Team {
    let ht = this.returnHomeTeam();
    let at = this.returnAwayTeam();
    if (ht.returnTossResult()) {
      return at;
    } else {
      return ht;
    }
  }
  returnLastOver(): OverClass {
    let overNum = this.currentInnings().returnOverCount();
    let overRecord = this.currentInnings().returnOverRecord(overNum);
    if (overRecord !== undefined) {
      return overRecord;
    } else {
      return new OverClass;
    }
  }
  returnOverCount(): string {
    let count = this.returnBowlingTeam().returnOversScore();
    return count;
  }
  retrieveExtraAmount(extraEv: number) {
    this.extraFormTotal.set(extraEv);
    return extraEv;
  }
  switchTeamRoles() {
    let ht = this.returnHomeTeam();
    let at = this.returnAwayTeam();

    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bat) {
        ht.setTeamRole(Roles.Bowl);
        at.setTeamRole(Roles.Bat);
      } else {
        ht.setTeamRole(Roles.Bat);
        at.setTeamRole(Roles.Bowl);
      }
    }
  }
  returnLastInning(): InningsClass | undefined {
    let teamName = this.returnBattingTeam().returnTeamName();
    let inning = this.currentMatch().returnInning(teamName);
    if (inning !== undefined) {
      return inning;
    } else {
      return undefined;
    }
  }
  checkStrikeChanged(dt: DeliveryType): boolean {
    if (dt.event === DeliveryEvents.Wide) {
      if (dt.totalRuns % 2 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (dt.totalRuns % 2 !== 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  checkInningComplete = computed(() => {
    let ov = this.currentMatch().retuyrnMaxOver();
    let check = this.currentInnings().checkInningComplete(ov);
    return check;
  });
  matchEvents(matchEv: MatchEventTeams) {
    let mEv = matchEv.event;
    let data = matchEv.data;
    let ht = this.returnHomeTeam()!;
    let at = this.returnAwayTeam()!;
    let ov = this.currentOver();
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
      case MatchEvents.TossCompleted: {
        let result: TossResult = data;
        ht.setTossResult(result.home);
        at.setTossResult(result.away);
        this.showCoinTossUi.set(false);
        this.showRoleSelectionUi.set(true);
        break;
      }
      case MatchEvents.RoleSelected: {
        let winner = this.returnTossWinner();
        let loser = this.returnTossLoser();
        let choice: RoleChoice = data;
        winner.setTeamRole(choice.win);
        loser.setTeamRole(choice.loss);
        this.showRoleSelectionUi.set(false);
        this.showSelectOpeningBatsForm.set(true);
        break;
      }
      case MatchEvents.OpenersChosen: {
        let selection: OpeningBats = data;
        let batTeam = this.returnBattingTeam();
        batTeam.setBatterOne(selection.b1);
        batTeam.setBatterTwo(selection.b2);
        this.showSelectOpeningBatsForm.set(false);
        this.formSelect.set(Roles.Bowl);
        this.showSelectPlayerForm.set(true);
        break;
      }
      case MatchEvents.BatterChosen: {
        let b1 = this.returnBattingTeam().returnBatterOne();
        let batOut = this.returnBattingTeam().returnOnStrikePlayerName();

        let batIn: string = data;
        if (b1 === batOut) {
          this.returnBattingTeam().setBatterOne(batIn);
        } else {
          this.returnBattingTeam().setBatterTwo(batIn);
        }

        this.showSelectPlayerForm.set(false);
        this.showBtnUi.set(true);
        break;
      }
      case MatchEvents.BowlerChosen: {
        let selection: string = data;
        let bowlTeam = this.returnBowlingTeam();

        if (bowlTeam.returnCurrentBowler() !== '') {
          let previous = bowlTeam.returnCurrentBowler();
          bowlTeam.setLastBowler(previous);
        }
        bowlTeam.setCurrentBowler(selection);
        ov.setBowler(selection);

        this.showSelectPlayerForm.set(false);
        if (!this.newInningsStarted()) {
          this.newInningsStarted.set(true);
        }
        this.showBtnUi.set(true);
        break;
      }
      case MatchEvents.FielderChosen: {
        this.showSelectPlayerForm.set(false);
        this.showBtnUi.set(true);
        break;
      }
      case MatchEvents.InningsComplete: {
        let batTeam = this.returnBattingTeam().returnTeamName();
        let record = this.currentInnings();
        this.currentMatch().inningCompleted(batTeam, record);
        this.showEndOverUi.set(false);
        this.newInningsStarted.set(false);
        this.showEndInningUi.set(true);
        break;
      }
      case MatchEvents.NewInning: {
        this.switchTeamRoles();
        this.showEndInningUi.set(false);
        this.currentOver.set(new OverClass());
        this.currentInnings.set(new InningsClass());
        this.showSelectOpeningBatsForm.set(true);
        break;
      }
      case MatchEvents.OverComplete: {
        let record = this.currentOver();
        this.currentInnings().overCompleted(record);
        let bowlName = this.returnBowlingTeam().returnCurrentBowler();
        this.returnBowlingTeam().returnPlayerProfile(bowlName).returnBowlProfile().overBowled();
        this.currentOver.set(new OverClass());
        this.showEndOverUi.set(true);
        break;
      }
      case MatchEvents.DeliveryComplete: {
        let dEv: DeliveryType = data;
        this.deliveryEvent(dEv);
        let batTeam = this.returnBattingTeam();
        let bowlTeam = this.returnBowlingTeam();
        if (ov.checkPreviousDeliveryLegit()) {
          bowlTeam.returnPlayerProfile(dEv.bowler).returnBowlProfile().deliveryCompleted();
        }
        let ovNum = this.returnOverCount();
        let comms = new CommentaryClass(ovNum, dEv);
        let commEvent = comms.createCommentary();
        this.commentary().unshift(commEvent);
        if (this.checkStrikeChanged(dEv)) {
          batTeam.strikeRotated();
        }
        break;
      }
      case MatchEvents.NewOver: {
        this.showEndOverUi.set(false);
        let batTeam = this.returnBattingTeam();
        batTeam.strikeRotated();
        this.formSelect.set(Roles.Bowl);
        this.showSelectPlayerForm.set(true);

        break;
      }
      case MatchEvents.MatchEnd: {
        this.showEndInningUi.set(false);
        this.newInningsStarted.set(false);
        this.showEndMatchUi.set(true);
        break;
      }
    }
  }
  deliveryEvent(delivery: DeliveryType) {
    let event = delivery.event;
    let batter = delivery.batter;
    let bowler = delivery.bowler;
    let runs = delivery.totalRuns;
    let ov = this.currentOver();
    let batTeam = this.returnBattingTeam();
    let bowlTeam = this.returnBowlingTeam();
    switch (event) {
      case DeliveryEvents.Default: {
        break;
      }
      case DeliveryEvents.DotBall: {
        ov.enterDeliveryRecord(delivery);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addRunScored(runs);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().runsConceded(runs);
        break;
      }
      case DeliveryEvents.Runs: {
        ov.enterDeliveryRecord(delivery);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addRunScored(runs);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().runsConceded(runs);
        break;
      }
      case DeliveryEvents.Wide: {
        ov.enterDeliveryRecord(delivery);
        batTeam.getBowlersWide(runs);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().wideBowled(runs);
        break;
      }
      case DeliveryEvents.Noball: {
        ov.enterDeliveryRecord(delivery);
        batTeam.getBowlersNb(1);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addRunScored(runs);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().noballBowled(runs);
        break;
      }
      case DeliveryEvents.Byes: {
        ov.enterDeliveryRecord(delivery);
        batTeam.byeBowled(runs);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addDeliveryFaced();
        break;
      }
      case DeliveryEvents.Legbyes: {
        ov.enterDeliveryRecord(delivery);
        batTeam.legbyeBowled(runs);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addDeliveryFaced();
        break;
      }
      case DeliveryEvents.Bowled: {
        ov.enterDeliveryRecord(delivery);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addDeliveryFaced();
        batTeam.batterDismissed(delivery.bowler, delivery.event);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().wicketTaken();
        if (!batTeam.checkAllOut()) {
          this.formSelect.set(Roles.Bat);
          this.showSelectPlayerForm.set(true);
        }
        break;
      }
      case DeliveryEvents.Caught: {
        ov.enterDeliveryRecord(delivery);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addDeliveryFaced();
        batTeam.batterDismissed(delivery.bowler, delivery.event);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().wicketTaken();
        if (!batTeam.checkAllOut()) {
          this.formSelect.set(Roles.Bat);
          this.showSelectPlayerForm.set(true);
        }
        break;
      }
      case DeliveryEvents.Lbw: {
        ov.enterDeliveryRecord(delivery);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addDeliveryFaced();
        batTeam.batterDismissed(delivery.bowler, delivery.event);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().wicketTaken();
        if (!batTeam.checkAllOut()) {
          this.formSelect.set(Roles.Bat);
          this.showSelectPlayerForm.set(true);
        }
        break;
      }
      case DeliveryEvents.Stumped: {
        ov.enterDeliveryRecord(delivery);
        batTeam.returnPlayerProfile(batter).returnBatProfile().addDeliveryFaced();
        batTeam.batterDismissed(delivery.bowler, delivery.event);
        bowlTeam.returnPlayerProfile(bowler).returnBowlProfile().wicketTaken();
        if (!batTeam.checkAllOut()) {
          this.formSelect.set(Roles.Bat);
          this.showSelectPlayerForm.set(true);
        }
        break;
      }
      case DeliveryEvents.Runout: {
        ov.enterDeliveryRecord(delivery);
        batTeam.batterDismissed("", delivery.event);
        if (!batTeam.checkAllOut()) {
          this.formSelect.set(Roles.Bat);
          this.showSelectPlayerForm.set(true);
        }
        break;
      }
    }
  }
  uiEvent(ui: UiEventType) {
    let event = ui.event;
    let bool = ui.bool;
    this.changeUi(event, bool);
  }
}

