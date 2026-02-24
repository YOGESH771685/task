import { TestBed } from '@angular/core/testing';

import { ControlInstanceService } from './control-instance';

describe('ControlInstance', () => {
  let service: ControlInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
