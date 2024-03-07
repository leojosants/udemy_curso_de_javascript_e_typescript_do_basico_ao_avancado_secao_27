import React, { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/use-interval";
import { Button } from "./button";
import { Timer } from "./timer";
import { secondToTime } from "../utils/seconds-to-time";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTimer);
  const [timeCouting, setTimeCouting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true));
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(() => {
    setMainTime(mainTime - 1);

    if (working) {
      setFullWorkingTime(fullWorkingTime + 1);
    }
  }, timeCouting ? 1000 : null);

  const configureWork = useCallback(() => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTimer);
    audioStartWorking.play();
  }, [
    setTimeCouting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTimer
  ]);

  const configureRest = useCallback((long: boolean) => {
    setTimeCouting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTime);
    }
    else {
      setMainTime(props.shortRestTime);
    }

    audioStopWorking.play();
  }, [
    setTimeCouting,
    setWorking,
    setResting,
    setMainTime,
    props.longRestTime,
    props.shortRestTime
  ]);

  useEffect(() => {
    if (working) {
      document.body.classList.add('isWorking');
    }

    if (resting) {
      document.body.classList.remove('isWorking');
    }

    if (mainTime > 0) {
      return;
    }

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    }
    else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1)
    }

    if (working) {
      setNumberOfPomodoros(numberOfPomodoros + 1)
    }

    if (resting) {
      configureWork();
    }
  }, [
    working,
    resting,
    mainTime,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    cyclesQtdManager,
    numberOfPomodoros,
    props.cycles, completedCycles
  ]);

  return (
    <div className="c-pomodoro">
      <h2>Você está: {working ? 'TRABALHANDO' : 'DESCANSANDO'}</h2>

      <Timer mainTime={mainTime} />

      <div className="c-pomodoro__controls">
        <Button
          text="Trabalhar"
          onclick={() => configureWork()}
        />
        <Button
          text="Descansar"
          onclick={() => configureRest(false)}
        />
        <Button
          className={!working && !resting ? 'isHidden' : ''}
          text={timeCouting ? "Pausar" : "Iniciar"}
          onclick={() => setTimeCouting(!timeCouting)}
        />
      </div>

      <div className="c-pomodoro__details">
        <h4>Nome da tarefa aqui</h4>
        <p>Ciclos concluídos:    <span className="c-pomodoro__cycles">{completedCycles}</span></p>
        <p>Horas trabalhadas:    <span className="c-pomodoro__hours">{secondToTime(fullWorkingTime)}</span></p>
        <p>Pomodoros concluídos: <span>{numberOfPomodoros}</span></p>
      </div>
    </div>
  );
}
