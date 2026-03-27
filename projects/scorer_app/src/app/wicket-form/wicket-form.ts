import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';
import { Team } from '../team-class/team-class';
import { UiEvent, UiEventType } from '../event-class/ui-events';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { MatchEvents } from '../event-class/match-events';

@Component({
  selector: 'app-wicket-form',
  imports: [],
  templateUrl: './wicket-form.html',
  styleUrl: './wicket-form.css',
})
export class WicketForm {
  batTeam: InputSignal<Team> = input(new Team("Bat Team"));
  bowlTeam: InputSignal<Team> = input(new Team("Bowl Team"));

  @Output() wicketEvent: EventEmitter<MatchEventTeams> = new EventEmitter();
  @Output() hideWicketForm: EventEmitter<UiEventType> = new EventEmitter();

  wicketBowled() {
    let bat = this.batTeam();
    let bowl = this.bowlTeam();
    let batName = bat.returnOnStrikePlayerName();
    let bowlName = bowl.returnCurrentBowler();
    let dEv = DeliveryEvents.Bowled;
    let runs = 0;

    let delivery: DeliveryType = {
      batter: batName, bowler: bowlName, event: dEv, totalRuns: runs,
    };

    let event: MatchEventTeams = {
      event: MatchEvents.DeliveryComplete,
      data: delivery,
    };

    let ui: UiEventType = {
      event: UiEvent.ShowWicketForm,
      bool: false,
    };
    this.hideWicketForm.emit(ui);
    this.wicketEvent.emit(event);
  }
  wicketCaught() {
    let bat = this.batTeam();
    let bowl = this.bowlTeam();

    let batName = bat.returnOnStrikePlayerName();
    let bowlName = bowl.returnCurrentBowler();
    let dEv = DeliveryEvents.Caught;
    let runs = 0;

    let delivery: DeliveryType = {
      batter: batName, bowler: bowlName, event: dEv, totalRuns: runs,
    };

    let event: MatchEventTeams = {
      event: MatchEvents.DeliveryComplete,
      data: delivery,
    };

    let ui: UiEventType = {
      event: UiEvent.ShowWicketForm,
      bool: false,
    };
    this.hideWicketForm.emit(ui);
    this.wicketEvent.emit(event);
  }
  wicketLbw() {
    let bat = this.batTeam();
    let bowl = this.bowlTeam();

    let batName = bat.returnOnStrikePlayerName();
    let bowlName = bowl.returnCurrentBowler();
    let dEv = DeliveryEvents.Lbw;
    let runs = 0;

    let delivery: DeliveryType = {
      batter: batName, bowler: bowlName, event: dEv, totalRuns: runs,
    };
    let event: MatchEventTeams = {
      event: MatchEvents.DeliveryComplete,
      data: delivery,
    };
    let ui: UiEventType = {
      event: UiEvent.ShowWicketForm,
      bool: false,
    };
    this.hideWicketForm.emit(ui);
    this.wicketEvent.emit(event);
  }
  wicketStumped() {
    let bat = this.batTeam();
    let bowl = this.bowlTeam();

    let batName = bat.returnOnStrikePlayerName();
    let bowlName = bowl.returnCurrentBowler();
    let dEv = DeliveryEvents.Stumped;
    let runs = 0;

    let delivery: DeliveryType = {
      batter: batName, bowler: bowlName, event: dEv, totalRuns: runs,
    };

    let event: MatchEventTeams = {
      event: MatchEvents.DeliveryComplete,
      data: delivery,
    };
    let ui: UiEventType = {
      event: UiEvent.ShowWicketForm,
      bool: false,
    };
    this.hideWicketForm.emit(ui);
    this.wicketEvent.emit(event);
  }
  wicketRunout() {
    let bat = this.batTeam();
    let bowl = this.bowlTeam();

    let batName = bat.returnOnStrikePlayerName();
    let bowlName = bowl.returnCurrentBowler();
    let dEv = DeliveryEvents.Runout;
    let runs = 0;

    let delivery: DeliveryType = {
      batter: batName, bowler: bowlName, event: dEv, totalRuns: runs,
    };
    let event: MatchEventTeams = {
      event: MatchEvents.DeliveryComplete,
      data: delivery,
    };

    let ui: UiEventType = {
      event: UiEvent.ShowWicketForm,
      bool: false,
    };
    this.hideWicketForm.emit(ui);
    this.wicketEvent.emit(event);
  }
}
