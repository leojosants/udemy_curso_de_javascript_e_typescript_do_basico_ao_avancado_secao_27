//disable- no-unused-vars

import React from "react";
import { useInterval } from "../hooks/use-interval";
import { secondToTime } from "../utils/seconds-to-time";

interface Props {
  defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div>Olá, Mundo Pomodoro {secondToTime(mainTime)}</div>
  );
}
