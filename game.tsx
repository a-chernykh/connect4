export enum Player {
  Player1 = 1,
  Player2 = 2,
};

export enum CellState {
  Empty = 0,
  Player1 = 1,
  Player2 = 2,
};

interface Combination {
  readonly player: Player;
  readonly len: number;
  readonly i: number;
  readonly j: number;
  readonly ni: number;
  readonly nj: number;
};

const winningCount = 4;

function combination(field: CellState[][],
                     i: number,
                     j: number,
                     di: number,
                     dj: number) : Combination {
  let rows = field.length,
      cols = field[0].length,
      len = 0,
      i1 = i,
      j1 = j,
      search = field[i][j];

  while (i1 >= 0 && i1 < rows && j1 >= 0 && j1 < cols && field[i1][j1] == search) {
    i1 += di;
    j1 += dj;
    len += 1;
  }

  let ni = i1+di,
      nj = j1+dj;

  if (!(ni < rows && nj < cols && ni >= 0 && nj >= 0 && field[ni][nj] == CellState.Empty)) {
    ni = i-di;
    nj = j-dj;

    if (!(ni < rows && nj < cols && ni >= 0 && nj >= 0 && field[ni][nj] == CellState.Empty)) {
      ni = null;
      nj = null;
    }
  }

  return {
    player: field[i][j],
    len: len,
    i: i,
    j: j,
    ni: ni,
    nj: nj,
  };
}

function getAllCombinations(field: CellState[][]) : Combination[] {
  let rows = field.length,
      cols = field[0].length,
      combinations = [];

  for (let i=0; i < rows; i++) {
    for (let j=0; j < cols; j++) {
      let current = field[i][j];

      if (current != CellState.Empty) {
        combinations.push(combination(field, i, j, -1, 1));
        combinations.push(combination(field, i, j, 1, 1));
        combinations.push(combination(field, i, j, 0, 1));
        combinations.push(combination(field, i, j, 1, 0));
      }
    }
  }

  return combinations;
}

export function getWinner(field: CellState[][]) : Player {
  let rows = field.length,
      cols = field[0].length,
      combinations = getAllCombinations(field);

  for (let i=0; i < combinations.length; i++) {
    if (combinations[i].len == winningCount) {
      return combinations[i].player;
    }
  }

  return null;
}

export function makeAIMove(field: CellState[][]) : number {
  let rows = field.length,
      cols = field[0].length,
      combinations = getAllCombinations(field);

  console.log(combinations);
  for (let i=0; i < combinations.length; i++) {
    if (combinations[i].len == winningCount - 1 && combinations[i].nj) {
      return combinations[i].nj;
    }
  }

  return 0;
}

export function getFreeRow(field: CellState[][], col: number) : number {
  let rows = field.length,
      cols = field[0].length;

  for (let i=rows-1; i >= 0; i--) {
    if (field[i][col] == CellState.Empty) {
      return i;
    }
  }
}
