import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { App } from '../app';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatchEvents } from '../event-btns/event-btns';

@Component({
  selector: 'app-select-openers-form',
  imports: [ReactiveFormsModule],
  templateUrl: './select-openers-form.html',
  styleUrl: './select-openers-form.css',
})
export class SelectOpenersForm {
  teams = inject(App);
  htPlayers = this.createHomePlayerList();
  atPlayers = this.createAwayPlayerList();

  battingTeam = signal(this.returnBattingTeam());
  returnBattingTeam() {
    let ht = this.teams.returnHomeTeam().returnTeamRole();
    if (ht === 'Batting') {
      return this.htPlayers;
    } else {
      return this.atPlayers;
    }
  }
  batOneSelected = signal(false);
  batTwoSelected = signal(false);

  batOneName = signal('');
  batTwoName = signal('');

  @Output() openingBatters: EventEmitter<[string, string]> = new EventEmitter();
  @Output() openerSelected: EventEmitter<MatchEvents> = new EventEmitter();

  createHomePlayerList(): string[] {
    let teamArray = new Array;
    for (let name of this.teams.returnHomeTeam().returnPlayerNames()) {
      teamArray.push(name);
    }
    return teamArray;
  }
  createAwayPlayerList(): string[] {
    let teamArray = new Array;
    for (let name of this.teams.returnAwayTeam().returnPlayerNames()) {
      teamArray.push(name);
    }
    return teamArray;
  }
  openerForm = new FormGroup({
    playerOne: new FormControl(false),
    playerTwo: new FormControl(false),
  });
  onClickP1(index: number) {
    if (!this.openerForm.controls.playerOne.value) {
      this.batOneSelected.set(true);
      let name = this.battingTeam().at(index)!;
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
      let name = this.battingTeam().at(index)!;
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
    let bats: [string, string] = ['', ''];
    bats[0] = (this.batOneName());
    bats[1] = (this.batTwoName());
    console.log(bats);
    this.openingBatters.emit(bats);
    this.openerSelected.emit(MatchEvents.OpenersChosen);
  }
}
