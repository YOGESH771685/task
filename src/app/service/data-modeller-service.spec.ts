import { TestBed } from '@angular/core/testing';

import { DataModellerService } from './data-modeller-service';

describe('DataModellerService', () => {
  let service: DataModellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
