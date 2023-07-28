import { useState } from 'react';
import { useInterval } from '../hooks/use-interval';

interface Props {
    defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer)

    useInterval(() => {
        setMainTime(mainTime + 1);
    }, 1000);

    return <div>PomodoroTimer{mainTime}</div>
}