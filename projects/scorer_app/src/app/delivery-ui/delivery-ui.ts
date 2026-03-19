import { Component, input, InputSignal } from '@angular/core';
import { DeliveryEvents, DeliveryType } from '../event-class/delivery-events';
import { OverClass } from '../over-class/over-class';

@Component({
  selector: 'app-delivery-ui',
  imports: [],
  templateUrl: './delivery-ui.html',
  styleUrl: './delivery-ui.css',
})
export class DeliveryUi {
  over: InputSignal<OverClass | undefined> = input();

  returnOverRecord(): Array<DeliveryType> {
    let ov = this.over();
    if (ov !== undefined) {
      return ov.returnDeliveryRecord();
    } else {
      return new Array;
    }
  }
  checkForDot(dt: DeliveryType): boolean {
    if (dt.event === DeliveryEvents.DotBall) {
      return true;
    } else {
      return false;
    }
  }
  returnDeliveryRecord(dT: DeliveryType): string {
    let ev = dT.event;
    let runs = dT.totalRuns;
    switch (ev) {
      case DeliveryEvents.Runs: return runs.toString();
      case DeliveryEvents.Wide: return runs.toString() + 'wd';
      case DeliveryEvents.Noball: return 'nb' + runs.toString();
      case DeliveryEvents.Byes: return runs.toString() + 'b';
      case DeliveryEvents.Legbyes: return runs.toString() + 'lb';
      case DeliveryEvents.Bowled: break;
      case DeliveryEvents.Caught: break;
      case DeliveryEvents.Lbw: break;
      case DeliveryEvents.Stumped: break;
      case DeliveryEvents.Runout: break;
      default: return '';
    }
    return ' ';
  }
}
