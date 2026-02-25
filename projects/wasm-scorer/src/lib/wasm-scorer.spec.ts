import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasmScorer } from './wasm-scorer';

describe('WasmScorer', () => {
  let component: WasmScorer;
  let fixture: ComponentFixture<WasmScorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasmScorer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasmScorer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
