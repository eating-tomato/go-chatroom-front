import { combineReducers, createStore } from 'redux';
import { Action, Payloads, State } from './interface';
import { reducers } from './reducer';

const initial_state:State = {
  route:'LOGIN',
};

function root_reducer(state = initial_state, action:Action) {
  if (is_reducer_action(action)) {
    return reducers[action.type](state, action);
  }
  return state;
}

export const store = createStore(root_reducer);

function is_reducer_action(action:Action) : action is Action<keyof Payloads, any> {
  return Object.keys(reducers).includes(action.type);
}