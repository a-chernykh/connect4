export enum Player {
  Player1 = 1,
  Player2 = 2,
};

export enum CellState {
  Empty = 0,
  Player1 = 1,
  Player2 = 2,
};

const winningCount = 4;

export function getWinner(field: CellState[][]) : Player {
  let rows = field.length,
      cols = field[0].length;

  for (let i=0; i < rows; i++) {
    for (let j=0; j < cols; j++) {
      let current = field[i][j];

      if (current != CellState.Empty) {
        let searchHorizontalUp = (i >= winningCount - 1);
        let searchHorizontalDown = (i <= rows - winningCount);
        let searchRight = (j <= cols - winningCount);
        let searchDown = (i <= rows - winningCount);

        if (searchHorizontalUp) {
          let found = true;
          for (let i1=i-1, j1=j+1; i1 > i-winningCount, j1 < j+winningCount; i1--, j1++) {
            if (field[i1][j1] != current) {
              found = false;
              break;
            }
          }
          if (found) {
            return current;
          }
        }
        if (searchHorizontalDown) {
          let found = true;
          for (let i1=i+1, j1=j+1; i1 < i+winningCount, j1 < j+winningCount; i1++, j1++) {
            if (field[i1][j1] != current) {
              found = false;
              break;
            }
          }
          if (found) {
            return current;
          }
        }
        if (searchRight) {
          let found = true;
          for (let j1=j+1; j1 < j+winningCount; j1++) {
            if (field[i][j1] != current) {
              found = false;
              break;
            }
          }
          if (found) {
            return current;
          }
        }
        if (searchDown) {
          let found = true;
          for (let i1=i+1; i1 < i+winningCount; i1++) {
            if (field[i1][j] != current) {
              found = false;
              break;
            }
          }
          if (found) {
            return current;
          }
        }
      }
    }
  }

  return null;
}

export function makeAIMove(field: CellState[][], AIPlayer: Player) : number {
  let rows = field.length,
      cols = field[0].length;
  let col = Math.floor(Math.random() * cols);
  return col;
}
