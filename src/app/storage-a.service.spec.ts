import { TestBed } from '@angular/core/testing';

import { StorageAService } from './storage-a.service';

describe('StorageAService', () => {
  let service: StorageAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
