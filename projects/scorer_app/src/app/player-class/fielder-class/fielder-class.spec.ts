import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FielderClass } from './fielder-class';

describe('FielderClass', () => {
  let component: FielderClass;
  let fixture: ComponentFixture<FielderClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FielderClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FielderClass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
