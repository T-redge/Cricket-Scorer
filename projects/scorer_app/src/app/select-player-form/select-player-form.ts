import { Component, computed, EventEmitter, input, InputSignal, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatchEvents } from '../event-class/match-events';
import { Team } from '../team-class/team-class';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
import { Roles } from '../roleselect-ui/roleselect-ui';

@Component({
  selector: 'app-select-player-form',
  imports: [ReactiveFormsModule],
  templateUrl: './select-player-form.html',
  styleUrl: './select-player-form.css',
})
export class SelectPlayerForm {
  homeTeam: InputSignal<Team | undefined> = input();
  awayTeam: InputSignal<Team | undefined> = input();

  formLabel: InputSignal<Roles | undefined> = input();

  returnPlayerType(): string {
    if (this.formLabel() === Roles.Bat) {
      return "Batter";
    } else if (this.formLabel() === Roles.Bowl) {
      return "Bowler";
    } else {
      return "Fielder";
    }
  }
  returnTeamForm = computed(() => {
    let batTeam = this.returnBattingTeam();
    let bowlTeam = this.returnBowlingTeam();
    if (this.formLabel() === Roles.Bat) {
      return batTeam;
    } else {
      return bowlTeam;
    }
  });

  returnBattingTeam(): string[] {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bat) {
        return ht.returnPlayerNames();
      } else {
        return at.returnPlayerNames();
      }
    } else {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    }
  }
  returnBowlingTeam(): string[] {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === Roles.Bowl) {
        return ht.returnPlayerNames();
      } else {
        return at.returnPlayerNames();
      }
    } else {
      return ['Hello', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    }
  }

  playerChosen = new FormControl(this.returnTeamForm()[0], { nonNullable: true });

  @Output() eventPlayerChosen: EventEmitter<MatchEventTeams> = new EventEmitter();

  emitPlayerChosenEvent() {
    let name = this.returnPlayerName();
    switch (this.formLabel()) {
      case Roles.Bat: {
        let event: MatchEventTeams = {
          event: MatchEvents.BatterChosen,
          data: name,
        };
        this.eventPlayerChosen.emit(event);
        break;
      }
      case Roles.Bowl: {
        let event: MatchEventTeams = {
          event: MatchEvents.BowlerChosen,
          data: name,
        };
        this.eventPlayerChosen.emit(event);
        break;
      }
      case Roles.Field: {
        let event: MatchEventTeams = {
          event: MatchEvents.FielderChosen,
          data: name,
        };
        this.eventPlayerChosen.emit(event);
        break;
      }
    }
  }

  returnPlayerName(): string {
    if (this.playerChosen.dirty) {
      return this.playerChosen.getRawValue();
    } else {
      return ''
    }
  }
}
