import React, { FC, useState } from "react";
import { SmileType } from "./types";

interface SmileProps {
  type?: SmileType;
  restart: () => void;
  setSmileType: (arg: SmileType) => void;
}

export const Smile: FC<SmileProps> = ({
  type = "default",
  restart,
  setSmileType,
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      className={"smile " + type}
      onMouseDown={() => {
        setClicked(true);
        setSmileType("pressed");
      }}
      onMouseUp={() => {
        setClicked(false);
        restart();
      }}
      onMouseLeave={() => {
        if (clicked) {
          setClicked(false);
          restart();
        }
      }}
    ></div>
  );
};
