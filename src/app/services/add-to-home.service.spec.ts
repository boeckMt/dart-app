import { TestBed } from '@angular/core/testing';

import { AddToHomeService } from './add-to-home.service';

describe('AddToHomeService', () => {
  let service: AddToHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
