import './App.css';
import Game from './Game'
import { atom, useAtom } from 'jotai'

function App() {
  const numAtom = atom('1')
  return (
    <div className="App">
      <Game></Game>
    </div>
  );
}

export default App;
