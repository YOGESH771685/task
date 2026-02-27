import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftEvaluteComponent } from './PageModeller-draft-evalute-component';

describe('DraftEvaluteComponent', () => {
  let component: DraftEvaluteComponent;
  let fixture: ComponentFixture<DraftEvaluteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftEvaluteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftEvaluteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
