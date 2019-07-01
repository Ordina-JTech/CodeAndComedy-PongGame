import { TestBed } from '@angular/core/testing';

import { PongGameService } from './pong-game.service';

describe('PongGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PongGameService = TestBed.get(PongGameService);
    expect(service).toBeTruthy();
  });
});
