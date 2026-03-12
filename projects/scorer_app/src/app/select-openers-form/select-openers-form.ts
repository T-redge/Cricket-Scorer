import { Component, EventEmitter, input, InputSignal, Output, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatchEvents } from '../event-class/match-events';
import { Team } from '../team-class/team-class';
import { MatchEventTeams } from '../match-settings-form/match-settings-form';
export type OpeningBats = {
  b1: string,
  b2: string,
};
@Component({
  selector: 'app-select-openers-form',
  imports: [ReactiveFormsModule],
  templateUrl: './select-openers-form.html',
  styleUrl: './select-openers-form.css',
})
export class SelectOpenersForm {
  homeTeam: InputSignal<Team | undefined> = input();
  awayTeam: InputSignal<Team | undefined> = input();

  batTeam: WritableSignal<Array<string>> = signal(this.returnBattingTeam());

  returnBattingTeam(): Array<string> {
    let ht = this.homeTeam();
    let at = this.awayTeam();
    if (ht !== undefined && at !== undefined) {
      if (ht.returnTeamRole() === 'Batting') {
        return ht.returnPlayerNames();
      } else {
        return at.returnPlayerNames();
      }
    } else {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    }
  }

  batOneSelected = signal(false);
  batTwoSelected = signal(false);

  batOneName = signal('');
  batTwoName = signal('');

  @Output() openingBatters: EventEmitter<MatchEventTeams> = new EventEmitter();

  openerForm = new FormGroup({
    playerOne: new FormControl(false),
    playerTwo: new FormControl(false),
  });

  onClickP1(index: number) {
    if (!this.openerForm.controls.playerOne.value) {
      this.batOneSelected.set(true);
      let name = this.batTeam().at(index)!;
      this.batOneName.set(name);
      this.openerForm.controls.playerOne.disable();
    } else {
      this.batOneSelected.set(false);
      this.batOneName.set('');
    }
  }
  onClickP2(index: number) {
    if (!this.openerForm.controls.playerTwo.value) {
      this.batTwoSelected.set(true);
      let name = this.batTeam().at(index)!;
      this.batTwoName.set(name);
      this.openerForm.controls.playerTwo.disable();
    } else {
      this.batTwoSelected.set(false);
      this.batTwoName.set('');
    }
  }
  disabledSubmit(): boolean {
    if (this.batOneSelected() && this.batTwoSelected()) {
      return false;
    } else {
      return true;
    }
  }
  resetPlayerOneForm() {
    this.openerForm.controls.playerOne.reset();
    this.openerForm.controls.playerOne.enable();
    this.batOneSelected.set(false);
    this.batOneName.set('');
  }
  resetPlayerTwoForm() {
    this.openerForm.controls.playerTwo.reset();
    this.openerForm.controls.playerTwo.enable();
    this.batTwoSelected.set(false);
    this.batTwoName.set('');
  }
  submitOpeningBatters() {
    let openers: OpeningBats = {
      b1: this.batOneName(),
      b2: this.batTwoName()
    };
    let emitEventData: MatchEventTeams = {
      event: MatchEvents.OpenersChosen,
      data: openers,
    };
    this.openingBatters.emit(emitEventData);
  }
}
