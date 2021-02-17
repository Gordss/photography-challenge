import { initialState, reducer } from "./reducers.js";

const createStateManager = (reducer, initialState) => {
  const manager = {};

  manager.state = initialState;
  manager.listeners = [];
  manager.subscribe = (listener) => manager.listeners.push(listener);
  manager.dispatch = (action) => {
    // TODO
    // validateAction(action);

    manager.state = reducer(manager.state, action);
    manager.listeners.forEach((listener) => listener(action));
  };
  manager.getState = () => manager.state;

  return manager;
};

export const StateManager = createStateManager(reducer, initialState);