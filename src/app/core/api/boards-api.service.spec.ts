import { TestBed } from '@angular/core/testing';

import { BoardsApiService } from './boards-api.service';

describe('BoardsApiService', () => {
  let service: BoardsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
