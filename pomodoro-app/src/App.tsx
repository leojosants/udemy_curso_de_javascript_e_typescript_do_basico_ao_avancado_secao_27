import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="c-body__container">
      <PomodoroTimer
        pomodoroTimer={3}
        shortRestTime={2}
        longRestTime={5}
        cycles={4}
      />
    </div>
  );
}

export default App;
