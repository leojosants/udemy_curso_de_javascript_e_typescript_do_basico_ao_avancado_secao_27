import { PomodoroTimer } from "./components/pomodoro-timer";

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTimer={1500}  // 25min
        shortRestTime={300}   // 5min - For each pomodoro one shortRestTime
        longRestTime={900}    // 15min
        cycles={4}            // For each end of cycle one longRestTime
      />
    </div>
  );
}

export default App;
