import React from "react";
import { secondToMinutes } from "../utils/seconds-to-minutes";

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="c-pomodoro__timer">{secondToMinutes(props.mainTime)}</div>;
}
