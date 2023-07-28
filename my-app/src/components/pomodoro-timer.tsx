import { useState, useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

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

    useEffect(() => {
        if (working) document.body.classList.add('working');
    }, [working]);

    useEffect(() => {

    });

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, timeCounting ? 1000 : null);

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
    };

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
                    text='teste'
                    onclick={() => console.log('Função onclick sendo chamada')}
                ></Button>

                <Button
                    text={timeCounting ? 'Pause' : 'Play'}
                    onclick={() => setTimeCounting(!timeCounting)}
                ></Button>
            </div>

            <div className="details">
                <p>Testando: Aqui vem os detalhes.</p>
            </div>
        </div>
    );
}