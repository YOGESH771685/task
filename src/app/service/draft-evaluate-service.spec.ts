import { TestBed } from '@angular/core/testing';
import { DraftEvaluateService } from './draft-evaluate-service';

describe('DraftEvaluateServiceTs', () => {
  let service: DraftEvaluateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftEvaluateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
