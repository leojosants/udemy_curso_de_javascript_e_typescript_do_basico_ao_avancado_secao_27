import { PomodoroTimer } from "./components/pomodoro-timer";

function App() {
  return (
    <div className="App">
      <PomodoroTimer defaultPomodoroTimer={3660} />
    </div>
  );
}

export default App;
