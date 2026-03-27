import { Component, computed, EventEmitter, input, InputSignal, Output, signal, WritableSignal } from '@angular/core';
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
  homeTeam: InputSignal<Team> = input(new Team("Home Team"));
  awayTeam: InputSignal<Team> = input(new Team("Away Team"));

  formLabel = input(Roles.Default);

  buttonLabel: WritableSignal<string> = signal('');

  battersOut = computed(() => {
    let bat = this.returnBatTeamProfile();
    if (bat !== undefined) {
      let dismissed = bat.returnFallofWicketNames();
      return dismissed;
    } else {
      return new Array;
    }
  });
  notOutBat = computed(() => {
    let bat = this.returnBatTeamProfile();
    if (bat !== undefined) {
      let batter = bat.returnOffStrikeName();
      return batter;
    } else {
      return "Default Batter";
    }
  });
  lastBowler = computed(() => {
    let bowl = this.returnBowlTeamProfile();
    if (bowl !== undefined) {
      let bowler = bowl.returnCurrentBowler();
      return bowler;
    } else {
      let bowler = "Default Bowler";
      return bowler;
    }
  });

  returnBatTeamProfile(): Team {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bat) {
      return ht;
    } else {
      return at;
    }
  }
  returnBowlTeamProfile(): Team {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bowl) {
      return ht;
    } else {
      return at;
    }
  }
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
  checkNotOutBats(): boolean {
    if (this.notOutBat() === this.playerChosen.value) {
      return true;
    } else {
      return false;
    }
  }
  checkDismissedBats(): boolean {
    let bool = false;
    this.battersOut().forEach((name) => {
      if (name === this.playerChosen.value) {
        bool = true;
      }
    });
    return bool;
  }
  lastOverBowlerCheck(): boolean {
    if (this.lastBowler() === this.playerChosen.value) {
      return true;
    } else {
      return false;
    }
  }
  selectionMade(): boolean {
    if (this.playerChosen.dirty) {
      return true;
    } else {
      return false;
    }
  }
  disableButton(): boolean {
    if (this.formLabel() === Roles.Bowl) {
      if (!this.selectionMade() || this.lastOverBowlerCheck()) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.checkDismissedBats() || this.checkNotOutBats()) {
        return true;
      } else {
        return false;
      }
    }
  }
  returnBattingTeam(): string[] {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bat) {
      return ht.returnPlayerNames();
    } else {
      return at.returnPlayerNames();
    }
  }
  returnBowlingTeam(): string[] {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht.returnTeamRole() === Roles.Bowl) {
      return ht.returnPlayerNames();
    } else {
      return at.returnPlayerNames();
    }
  }

  playerChosen = new FormControl('', { nonNullable: true });

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
    return this.playerChosen.value;
  }
}
