import React, { FC, useEffect, useState } from "react";
import { Dial } from "./Dial";

interface CellProps {
  isStarted: boolean;
  startTime: Date | null;
}

export const Timer: FC<CellProps> = ({ startTime, isStarted }) => {
  const [timerValue, setTimerValue] = useState(0);

  useEffect(() => {
    if (!startTime) {
      setTimerValue(0);
    }
    if (isStarted && startTime) {
      const interval = setInterval(
        () =>
          setTimerValue(
            Math.floor((new Date().valueOf() - startTime.valueOf()) / 1000)
          ),
        1000
      );
      if (!isStarted) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [isStarted, startTime]);

  return <Dial value={timerValue} />;
};
