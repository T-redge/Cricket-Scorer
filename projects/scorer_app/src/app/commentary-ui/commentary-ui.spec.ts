import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryUi } from './commentary-ui';

describe('CommentaryUi', () => {
  let component: CommentaryUi;
  let fixture: ComponentFixture<CommentaryUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentaryUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentaryUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
