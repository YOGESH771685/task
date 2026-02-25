import { TestBed } from '@angular/core/testing';

import { FluentService } from './fluent-service';

describe('FluentService', () => {
  let service: FluentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
