import { Reducers, State } from './interface';
import { assocPath, pipe } from 'ramda';

export const reducers:Reducers = {
  'UPDATE_CUR_ROUTE': (state, action) => assocPath(['route'], action.payload.route, state),
  'TRIGGER_IF_ENTER_ROOM_DIALOG': (state, action) => pipe<State, State, State>(
      assocPath(['if_enter_room_dialog', 'is_show'], action.payload.is_show),
      assocPath(['if_enter_room_dialog', 'room_id'],
          action.payload.room_id || state.if_enter_room_dialog.room_id))(state),
  'SHOW_CREATE_ROOM_DIALOG': (state, action) => assocPath(
      ['show_create_room_dialog'],
      action.payload.is_show,
      state),
  'SHOW_LOGIN_DIALOG': (state, action) => assocPath(['show_login_dialog'], action.payload.is_show, state),
  'UPDATE_CUR_ROOM_ID': (state, action) => assocPath(['cur_room_id'], action.payload.room_id, state),
};
