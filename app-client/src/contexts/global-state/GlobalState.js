import React, { useReducer } from 'react';
import { globalStateReducer } from './reducer';

const GlobalStateContext = React.createContext();
const GlobalStateUpdaterContext = React.createContext();

const initialState = {
  data: {
    type: 'votingResult',
    bjp: 0,
    congress: 0,
    totalVotes: 0
  }
};

function GlobalStateProvider(props) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateUpdaterContext.Provider value={dispatch}>{props.children}</GlobalStateUpdaterContext.Provider>
    </GlobalStateContext.Provider>
  );
}

function useGlobalState() {
  const state = React.useContext(GlobalStateContext);
  if (typeof state === 'undefined') {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
}

function useGlobalStateUpdater() {
  const dispatch = React.useContext(GlobalStateUpdaterContext);
  if (typeof dispatch === 'undefined') {
    throw new Error('useGlobalStateUpdater must be used within a GlobalStateProvider');
  }
  return dispatch;
}

export { GlobalStateProvider, useGlobalState, useGlobalStateUpdater };
