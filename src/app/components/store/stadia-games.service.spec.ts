import { TestBed } from '@angular/core/testing';

import { StadiaGamesService } from './stadia-games.service';

describe('StadiaGamesService', () => {
  let service: StadiaGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StadiaGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
