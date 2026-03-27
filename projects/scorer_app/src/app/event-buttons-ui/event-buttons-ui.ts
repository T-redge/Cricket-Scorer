import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';
import { MatchEvents } from '../event-class/match-events';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { OverClass } from '../over-class/over-class';
import { InningsClass } from '../innings-class/innings-class';
import { Team } from '../team-class/team-class';
import { UiEvent, UiEventType } from '../event-class/ui-events';

@Component({
  selector: 'app-event-buttons-ui',
  imports: [],
  templateUrl: './event-buttons-ui.html',
  styleUrl: './event-buttons-ui.css',
})
export class EventButtonsUi {
  over: InputSignal<OverClass> = input(new OverClass);
  inning: InputSignal<InningsClass> = input(new InningsClass);
  batTeam: InputSignal<Team> = input(new Team("Batting Team"));
  bowlTeam: InputSignal<Team> = input(new Team("Bowling Team"));

  @Output() deliveryEv: EventEmitter<MatchEventTeams> = new EventEmitter();
  @Output() showForm: EventEmitter<UiEventType> = new EventEmitter();
  endInning() {
    let event: MatchEventTeams = {
      event: MatchEvents.InningsComplete,
      data: undefined,
    }
    this.deliveryEv.emit(event);
  }
  endOver() {
    let event: MatchEventTeams = {
      event: MatchEvents.OverComplete,
      data: undefined,
    };
    this.deliveryEv.emit(event);
  }
  checkOverComplete(): boolean {
    let bowl = this.bowlTeam();
    let ov = this.over();
    let bowler = bowl.returnCurrentBowler();
    let delivery = bowl.returnPlayerProfile(bowler)!.returnBowlProfile().returnDeliveriesBowled();
    if (ov.checkOverComplete(delivery)) {
      return true;
    } else {
      return false;
    }
  }
  checkBatAllOut(): boolean {
    let bt = this.batTeam();
    if (bt.checkAllOut()) {
      return true;
    } else {
      return false;
    }
  }

  dotBall() {
    let ov = this.over();
    let bat = this.batTeam();
    let batter = bat.returnOnStrikePlayerName();
    let bowler = ov.returnBowlerName();
    let delivery: DeliveryType = {
      event: DeliveryEvents.DotBall,
      batter: batter,
      bowler: bowler,
      totalRuns: 0,
    }
    let event: MatchEventTeams = {
      event: MatchEvents.DeliveryComplete,
      data: delivery,
    };
    this.deliveryEv.emit(event);
  }
  showRunForm() {
    let event: UiEventType = {
      event: UiEvent.ShowRunForm,
      bool: true,
    };
    this.showForm.emit(event);
  }
  showExtraForm() {
    let event: UiEventType = {
      event: UiEvent.ShowExtraForm,
      bool: true,
    }
    this.showForm.emit(event);
  }
  showWicketForm() {
    let event: UiEventType = {
      event: UiEvent.ShowWicketForm,
      bool: true,
    };
    this.showForm.emit(event);
  }
}
