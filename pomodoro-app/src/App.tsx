import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="c-body__container">
      <PomodoroTimer
        pomodoroTimer={1500}  // 25 minutos
        shortRestTime={300}   // 5 minutos - Para cada pomodoro um curto descando de tempo
        longRestTime={900}    // 15 minutos
        cycles={4}            // Para cada final de ciclo um longo tempo de descanso
      />
    </div>
  );
}

export default App;
