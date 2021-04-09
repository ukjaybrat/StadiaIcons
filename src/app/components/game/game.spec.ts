import { IGame } from './game';

describe('Game', () => {
  it('should create an instance', () => {
    expect(new IGame()).toBeTruthy();
  });
});
