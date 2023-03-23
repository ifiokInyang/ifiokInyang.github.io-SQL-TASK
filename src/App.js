import logo from './logo.svg';
import './App.css';
import PuResults from './PuResults/PuResults';
import ResultsByLgas from './ResultsByLgas/ResultsByLgas';
import InsertNewResults from './InsertNewResults/InsertNewResults';

function App() {
  return (
    <div className="App">
      <PuResults />
      <ResultsByLgas />
      <InsertNewResults />
    </div>
  );
}

export default App;
