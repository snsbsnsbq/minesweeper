import React, { useEffect, useState } from "react";
import "./App.css";
import { Cell } from "./Cell";
import { cellXAmount, cellYAmount, minesCount } from "./consts";
import { Dial } from "./Dial";
import { Smile } from "./Smile";
import { Timer } from "./Timer";
import { Coords, FieldType, SmileType } from "./types";
import { genRandomMineField, getField, openCells, openFields } from "./utils";

function App() {
  const [clickCords, setclickCoords] = useState<null | Coords>(null);
  const [smileType, setSmileType] = useState<SmileType>("default");
  const [matrix, setMatrix] = useState(getField(cellXAmount, cellYAmount));
  const [field, setField] = useState(getField(cellXAmount, cellYAmount));
  const [isLosing, setLosing] = useState(false);
  const [flagCount, setFlagCount] = useState(minesCount);
  const [startTime, setStartTime] = useState<null | Date>(null);
  const [isStarted, setStarted] = useState(false);
  const [isWin, setWin] = useState(false);

  const openField = (coords: Coords, type: FieldType) => {
    let localMatrix = matrix;
    if (!isStarted) {
      localMatrix = genRandomMineField(
        cellXAmount,
        cellYAmount,
        minesCount,
        coords
      );
      setStarted(true);
      setMatrix(localMatrix);
      setStartTime(new Date());
    }
    const rowIdx = coords[0];
    const colIdx = coords[1];
    const newField = [...field];
    if (type === 1) {
      openCells(localMatrix, newField, [rowIdx, colIdx]);
    } else {
      newField[rowIdx][colIdx] = type;
    }
    setField(newField);
  };

  const clickOnMine = (coords: Coords) => {
    setLosing(true);
    setStarted(false);
    const rowIdx = coords[0];
    const colIdx = coords[1];
    const newMatrix = [...matrix];
    newMatrix[rowIdx][colIdx] = 10;
    setMatrix(newMatrix);
    setField(openFields(matrix, field));
  };

  const restart = () => {
    setMatrix(getField(cellXAmount, cellYAmount));
    setField(getField(cellXAmount, cellYAmount));
    setSmileType("default");
    setLosing(false);
    setStarted(false);
    setStartTime(null);
    setWin(false);
  };

  useEffect(() => {
    let count = 0;
    for (const line of field) {
      for (const cell of line) {
        if (cell === 2) {
          count++;
        }
      }
    }
    !isLosing && setFlagCount(minesCount - count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);

  useEffect(() => {
    let count = 0;
    for (const line of field) {
      for (const cell of line) {
        if (cell === 1) {
          count++;
        }
      }
    }
    const openCellCount = cellXAmount * cellYAmount - minesCount - count;
    if (!isLosing && openCellCount === 0) {
      setSmileType("glasses");
      setStarted(false);
      setWin(true);
    }
  }, [field, isLosing]);

  return (
    <div className="app-wrapper">
      <div className="app">
        <div className="header">
          <Dial value={flagCount} />
          <Smile
            type={smileType}
            restart={restart}
            setSmileType={setSmileType}
          />
          <Timer isStarted={isStarted} startTime={startTime} />
        </div>
        <div
          className="field"
          onMouseOut={() => {
            setclickCoords(null);
          }}
        >
          {matrix.map((line, lineIndex) => {
            return line.map((cellType: number, idx: number) => (
              <Cell
                isOpened={field[lineIndex][idx] === 1 ? true : false}
                isFlag={field[lineIndex][idx] === 2 ? true : false}
                isQuestion={field[lineIndex][idx] === 3 ? true : false}
                isNotMine={field[lineIndex][idx] === 4 ? true : false}
                idx={[lineIndex, idx]}
                clickCords={clickCords}
                setclickCoords={setclickCoords}
                cellType={cellType}
                setSmileType={setSmileType}
                openField={openField}
                key={[lineIndex, idx].toString()}
                isLosing={isLosing}
                clickOnMine={clickOnMine}
                isWin={isWin}
              />
            ));
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
