import './App.css';
import VotingApp from './components/VotingApp';
import { useGlobalStateUpdater } from './contexts/global-state/GlobalState';
import { getData } from "./contexts/global-state/actions";
import { useEffect } from 'react';

const App = () => {
  const dispatch = useGlobalStateUpdater();
  useEffect(() => {
    getData(dispatch);
    }, []);
  return (
    <div className="App">
      <VotingApp />
    </div>
  );
}

export default App;
