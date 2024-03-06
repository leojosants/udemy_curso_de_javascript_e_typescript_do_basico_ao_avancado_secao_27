import React from "react";
import { secondToTime } from "../utils/seconds-to-time";

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="c-pomodoro__timer">{secondToTime(props.mainTime)}</div>;
}
