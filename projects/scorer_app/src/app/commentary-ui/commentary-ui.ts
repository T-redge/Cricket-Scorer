import { Component, input, InputSignal } from '@angular/core';
import { CommentaryType } from '../commentary-class/commentary-class';
import { DeliveryUi } from '../delivery-ui/delivery-ui';

@Component({
  selector: 'app-commentary-ui',
  imports: [],
  templateUrl: './commentary-ui.html',
  styleUrl: './commentary-ui.css',
})
export class CommentaryUi {
  comms: InputSignal<Array<CommentaryType> | undefined> = input();

  returnComms(): Array<CommentaryType> {
    if (this.comms() !== undefined) {
      return this.comms()!;
    } else {
      return new Array;
    }
  }
  returnCommOver(ct: CommentaryType): string {
    return ct.commOver;
  }
  returnCommLine(ct: CommentaryType): string {
    return ct.commLine;
  }
}
