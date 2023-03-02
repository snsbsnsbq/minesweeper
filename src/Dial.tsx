import React, { FC } from "react";
import { NumberKeys } from "./types";

const getDialClassName = (value: NumberKeys) => {
  const obj = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  };

  return "number " + obj[value];
};

const getNumbers = (value: number | undefined) => {
  if (!value || value <= 0) {
    return [0, 0, 0];
  }
  if (value >= 999) {
    return [9, 9, 9];
  }
  const first = Math.floor(value / 100);
  const second = Math.floor((value / 10) % 10);
  const third = Math.floor(value % 10);
  return [first, second, third];
};

export const Dial: FC<{ value?: number }> = ({ value }) => {
  const [first, second, third] = getNumbers(value);

  return (
    <div className="d-flex">
      <div className={getDialClassName(first as NumberKeys)}></div>
      <div className={getDialClassName(second as NumberKeys)}></div>
      <div className={getDialClassName(third as NumberKeys)}></div>
    </div>
  );
};
