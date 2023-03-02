import React, { FC } from "react";
import { NumberKeys, SmileType } from "./types";

const getOpenCellClassName = (cellType: NumberKeys) => {
  const obj = {
    0: "cell-clicked",
    1: "cell-one",
    2: "cell-two",
    3: "cell-three",
    4: "cell-four",
    5: "cell-five",
    6: "cell-six",
    7: "cell-seven",
    8: "cell-eight",
    9: "cell-mine",
    10: "cell-mine-blowup",
  };
  return "cell " + obj[cellType];
};

const getCellClassName = (
  isClicked: boolean,
  isQuestion: boolean,
  isFlag: boolean,
  isNotMine: boolean
) => {
  if (isClicked) {
    return "cell cell-clicked";
  }
  if (isQuestion) {
    return "cell cell-question";
  }
  if (isFlag) {
    return "cell cell-flag";
  }
  if (isNotMine) {
    return "cell cell-mine-mistake";
  }
  return "cell cell-default";
};

interface CellProps {
  isOpened: boolean;
  idx: [number, number];
  clickCords: [number, number] | null;
  cellType: number;
  setSmileType: (type: SmileType) => void;
  setclickCords: (idx: null | [number, number]) => void;
  openField: (idx: [number, number], type: 0 | 1 | 2 | 3) => void;
  isLosing: boolean;
  isFlag: boolean;
  isQuestion: boolean;
  clickOnMine: (idx: [number, number]) => void;
  isNotMine: boolean;
  isWin: boolean;
}

export const Cell: FC<CellProps> = ({
  isOpened = true,
  idx,
  clickCords,
  cellType,
  setSmileType,
  setclickCords,
  openField,
  isLosing,
  isNotMine,
  isFlag,
  isQuestion,
  clickOnMine,
  isWin,
}) => {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isLosing && !isWin && e.button === 0 && !isFlag && !isQuestion) {
      setclickCords(idx);
      setSmileType("scared");
    }
  };
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isLosing && !isWin && e.button === 0 && !isFlag && !isQuestion) {
      setclickCords(null);
      openField(idx, 1);
      if (cellType === 9) {
        clickOnMine(idx);
        setSmileType("dead");
      } else {
        setSmileType("default");
      }
    }
  };
  const onMouseOut = () => {
    if (!isLosing && !isWin) {
      setclickCords(null);
      setSmileType("default");
    }
  };
  const onMouseOver = () => {
    if (!isLosing && !isWin) {
      if (clickCords) {
        setclickCords(idx);
        setSmileType("scared");
      }
    }
  };

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!isOpened && !isWin && !isLosing) {
      !isFlag && !isQuestion && openField(idx, 2);
      isFlag && openField(idx, 3);
      isQuestion && openField(idx, 0);
    }
  };

  const isClicked = clickCords
    ? idx[0] === clickCords![0] && idx[1] === clickCords![1]
    : false;

  return (
    <>
      {isOpened ? (
        <div
          className={getOpenCellClassName(cellType as NumberKeys)}
          onContextMenu={(e) => e.preventDefault()}
        ></div>
      ) : (
        <div
          className={getCellClassName(isClicked, isQuestion, isFlag, isNotMine)}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
          onContextMenu={(e) => onContextMenu(e)}
        ></div>
      )}
    </>
  );
};
