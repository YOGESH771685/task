import { TestBed } from '@angular/core/testing';
import { DraftEvaluate } from './PageModeller-draft-evaluate-service';

describe('DraftEvaluateServiceTs', () => {
  let service: DraftEvaluate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftEvaluate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
