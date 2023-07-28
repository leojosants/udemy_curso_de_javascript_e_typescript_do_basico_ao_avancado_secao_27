import { useState, useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../utils/seconds-to-time';

const bellStart = require('../sounds/bell-start.mp3');
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
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);

    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(props.cycles - 1).fill(true)
    );

    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, timeCounting ? 1000 : null);

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTimer);
        audioStartWorking.play();
    };

    const configureRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        if (long) setMainTime(props.longRestTime);
        else setMainTime(props.shortRestTime);

        audioStopWorking.play();
    };

    useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');
        if (mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            configureRest(false);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();
    }, [
        working,
        resting,
        mainTime,
        configureRest,
        configureWork,
        completedCycles,
        cyclesQtdManager,
        numberOfPomodoros,
        props.cycles
    ]);

    return (
        <div className='pomodoro'>
            <h2>You are: working</h2>

            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button
                    text='Working'
                    onclick={() => configureWork()}
                ></Button>

                <Button
                    text='Resting'
                    onclick={() => configureRest(false)}
                ></Button>

                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting ? 'Pause' : 'Play'}
                    onclick={() => setTimeCounting(!timeCounting)}
                ></Button>
            </div>

            <div className="details">
                <p>Completed cycles: {completedCycles}</p>
                <p>Worked hours: {secondsToTime(fullWorkingTime)}</p>
                <p>Completed Pomodoros: {numberOfPomodoros}</p>
            </div>
        </div>
    );
}