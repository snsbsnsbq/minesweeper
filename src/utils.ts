export const genRandomMineField = (
  width: number,
  height: number,
  minesCount: number,
  firstClickCords: [number, number]
) => {
  const matrix = Array(height);
  for (let i = 0; i < height; i++) {
    matrix[i] = Array(width).fill(0);
  }
  const mines = Array(width * height);
  for (let i = 0; i < mines.length; i++) {
    mines[i] = i;
  }
  mines.splice(firstClickCords[0] * width + firstClickCords[1], 1);

  mines.sort(() => Math.random() - 0.5);
  const aroundOffsets = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  for (let i = 0; i < minesCount; i++) {
    const y = Math.floor(mines[i] / width);
    const x = mines[i] % width;
    matrix[y][x] = 9;
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (matrix[y][x] === 9) continue;
      let minesAround = 0;
      for (const [dx, dy] of aroundOffsets) {
        const ax = x + dx;
        const ay = y + dy;
        if (
          ax >= 0 &&
          ax < width &&
          ay >= 0 &&
          ay < height &&
          matrix[ay][ax] === 9
        ) {
          minesAround++;
        }
      }
      matrix[y][x] = minesAround;
    }
  }
  return matrix;
};

export const getField = (width: number, height: number) => {
  const field = Array(width);
  for (let i = 0; i < width; i++) {
    field[i] = Array(height).fill(0);
  }
  return field;
};

export const openFields = (
  matrix: Array<Array<number>>,
  field: Array<Array<number>>
) => {
  const newField = [];
  for (let y = 0; y < field.length; y++) {
    const row = [];
    for (let x = 0; x < field[y].length; x++) {
      if (matrix[y][x] === 9) {
        row.push(1);
      } else if (field[y][x] === 2 && matrix[y][x] !== 9) {
        row.push(4);
      } else {
        row.push(field[y][x]);
      }
    }
    newField.push(row);
  }

  return newField;
};

export const openCells = (
  matrix: Array<Array<number>>,
  field: Array<Array<number>>,
  [clickY, clickX]: [number, number]
) => {
  field[clickY][clickX] = 1;
  const aroundOffsets = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  if (matrix[clickY][clickX] === 0) {
    for (const [dy, dx] of aroundOffsets) {
      const y = clickY + dy;
      const x = clickX + dx;
      if (
        y >= 0 &&
        y < matrix.length &&
        x >= 0 &&
        x < matrix[y].length &&
        field[y][x] === 0
      ) {
        openCells(matrix, field, [y, x]);
      }
    }
  }
};
