import { BatterClass } from './batter-class/batter-class';
import { BowlerClass } from './bowler-class/bowler-class';
import { FielderClass } from './fielder-class/fielder-class';

export class PlayerClass {
  batProfile = new BatterClass();
  bowlProfile = new BowlerClass();
  fieldProfile = new FielderClass();

  constructor() {
    this.batProfile = new BatterClass();
    this.bowlProfile = new BowlerClass();
    this.fieldProfile = new FielderClass();
  }

  returnBatProfile(): BatterClass {
    return this.batProfile;
  }
  returnBowlProfile(): BowlerClass {
    return this.bowlProfile;
  }
  returnFieldProfile(): FielderClass {
    return this.fieldProfile;
  }
}
