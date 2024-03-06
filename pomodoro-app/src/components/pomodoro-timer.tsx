import React from "react";
import { useInterval } from "../hooks/use-interval";
import { Button } from "./button";
import { Timer } from "./timer";

interface Props {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTimer);
  const [timeCouting, setTimeCouting] = React.useState(false);
  const [working, setWorking] = React.useState(false);

  React.useEffect(() => {
    if (working) {
      document.body.classList.add('isWorking');
    }
  }, [working]);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, timeCouting ? 1000 : null);

  const configureWork = () => {
    setTimeCouting(true);
    setWorking(true);
  };

  return (
    <div className="c-pomodoro">
      <h2>You are working</h2>

      <Timer mainTime={mainTime} />

      <div className="c-pomodoro__controls">
        <Button
          text="Work"
          onclick={() => configureWork()}
        />
        <Button
          text="teste"
          onclick={() => console.log('clicou')}
        />
        <Button
          text={timeCouting ? "Pause" : "Play"}
          onclick={() => setTimeCouting(!timeCouting)}
        />
      </div>

      <div className="c-pomodoro__details">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
}
