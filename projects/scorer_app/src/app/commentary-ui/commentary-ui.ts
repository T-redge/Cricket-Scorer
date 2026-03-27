import { Component, input, InputSignal } from '@angular/core';
import { CommentaryType } from '../commentary-class/commentary-class';

@Component({
  selector: 'app-commentary-ui',
  imports: [],
  templateUrl: './commentary-ui.html',
  styleUrl: './commentary-ui.css',
})
export class CommentaryUi {
  comms: InputSignal<Array<CommentaryType>> = input(new Array);

  returnComms(): Array<CommentaryType> {
    return this.comms();
  }
  returnCommOver(ct: CommentaryType): string {
    return ct.commOver;
  }
  returnCommLine(ct: CommentaryType): string {
    return ct.commLine;
  }
}
