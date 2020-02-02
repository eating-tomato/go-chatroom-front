import { createStore } from 'redux';
import { Action, Payloads, State } from './interface';
import { reducers } from './reducer';

const initial_state:State = {
  route: '',
  if_enter_room_dialog: {
    is_show: false,
  },
  show_create_room_dialog: false,
  show_login_dialog: false,
  cur_room_id: null,
};

function root_reducer(state = initial_state, action:Action) {
  if (is_reducer_action(action)) {
    return reducers[action.type](state, action);
  }
  return state;
}

export const store = createStore(root_reducer);

function is_reducer_action(action:Action):action is Action<keyof Payloads, any> {
  return Object.keys(reducers).includes(action.type);
}
