import { getWinner, makeAIMove, Player, CellState } from './game';

const E = CellState.Empty,
      P1 = CellState.Player1,
      P2 = CellState.Player2;

describe('getWinner()', () => {
  test('returns null on empty field', () => {
    let emptyField: CellState[][] = [
      [ E, E, E, E ],
      [ E, E, E, E ],
      [ E, E, E, E ],
      [ E, E, E, E ],
    ];

    expect(getWinner(emptyField)).toBe(null);
  });

  test('returns Player.Player1 for diagonal match (up)', () => {
    let winningField: CellState[][] = [
      [ E,  E,  E,  P1 ],
      [ E,  E,  P1, E  ],
      [ E,  P1, E,  E  ],
      [ P1, E,  E,  E  ],
    ];

    expect(getWinner(winningField)).toBe(Player.Player1);

    let nonWinningField: CellState[][] = [
      [ E,  E,  E,  E ],
      [ E,  E,  P1, E ],
      [ E,  P1, E,  E ],
      [ P1, E,  E,  E ],
    ];

    expect(getWinner(nonWinningField)).toBe(null);
  });

  test('returns Player.Player1 for diagonal match (down)', () => {
    let winningField: CellState[][] = [
      [ P1, E,  E,  E ],
      [ E,  P1, E,  E ],
      [ E,  E,  P1, E ],
      [ E,  E,  E,  P1],
    ];

    expect(getWinner(winningField)).toBe(Player.Player1);

    let nonWinningField: CellState[][] = [
      [ P1, E,  E,  E ],
      [ E,  P1, E,  E ],
      [ E,  E,  P1, E ],
      [ E,  E,  E,  E ],
    ];

    expect(getWinner(nonWinningField)).toBe(null);
  });

  test('returns Player.Player1 for horizontal', () => {
    let winningField: CellState[][] = [
      [ E,  E,  E,  E ],
      [ P1, P1, P1, P1 ],
      [ E,  E,  E,  E ],
      [ E,  E,  E,  E],
    ];

    expect(getWinner(winningField)).toBe(Player.Player1);
  });

  test('returns Player.Player1 for vertical', () => {
    let winningField: CellState[][] = [
      [ E, P1, E, E ],
      [ E, P1, E, E ],
      [ E, P1, E, E ],
      [ E, P1, E, E ],
    ];

    expect(getWinner(winningField)).toBe(Player.Player1);
  });
});

describe('makeAIMove()', () => {
  xtest('stays consistent', () => {
    let winningField: CellState[][] = [
      [ E, E,  E, E ],
      [ E, E,  E, E ],
      [ E, P1, E, E ],
      [ E, P1, E, E ],
    ];

    for(let i=0; i < 3; i++) {
      expect(makeAIMove(winningField, P1)).toBe(1);
    }
  });

  test('prevents opponent from winning', () => {
    let winningField: CellState[][] = [
      [ E, E,  E,  E ],
      [ E, E,  P2, E ],
      [ E, P1, P2, E ],
      [ E, P1, P2, E ],
    ];

    for(let i=0; i < 3; i++) {
      expect(makeAIMove(winningField, P1)).toBe(2);
    }
  });

  xtest('prevents opponent from building winning combination', () => {
    let winningField: CellState[][] = [
      [ E,  E, E,  E,  E, E ],
      [ E,  E, E,  E,  E, E ],
      [ P1, E, E,  E,  E, E ],
      [ P1, E, P2, P2, E, E ],
    ];

    for(let i=0; i < 3; i++) {
      expect(makeAIMove(winningField, P1)).toBe(1);
    }
  });

  test('finish up the game on winning combination', () => {
    let winningField: CellState[][] = [
      [ E, E,  E, E ],
      [ E, P1, E, E ],
      [ E, P1, E, E ],
      [ E, P1, E, E ],
    ];

    for(let i=0; i < 3; i++) {
      expect(makeAIMove(winningField, P1)).toBe(1);
    }
  });
});
