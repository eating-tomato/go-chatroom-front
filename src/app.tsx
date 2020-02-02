import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from 'redux';

import { State } from './redux/interface';
import { create_action } from './redux/action';
import { get_query_string } from './utils';
import { IfEnterRoomDialog } from './dialog/if_enter_room_dialog';
import { CreateRoomDialog } from './dialog/create_room_dialog';
import { LoginDialog } from './dialog/login_dialog';
import { LOCALSTORAGE_KEY } from './interface';
import { Home } from './home';

const map_state_to_props = (state:State) => ({
  room_id: state.cur_room_id,
});

const map_dispatch_to_props = (dispatch:Dispatch<Action<State>>) => bindActionCreators(
  {
    create_action,
  },
  dispatch,
);

type Props = ReturnType<typeof map_state_to_props>
    & ReturnType<typeof map_dispatch_to_props>;

export const App = connect(
    map_state_to_props,
    map_dispatch_to_props,
)((props:Props) => {
  React.useEffect(() => {
    const user_id = localStorage.getItem(LOCALSTORAGE_KEY.USER_ID);
    if (!user_id) {
      props.create_action('SHOW_LOGIN_DIALOG', {
        is_show: true,
      });
      return;
    }
    const room_id = get_query_string('room_id');
    if (!room_id) {
      props.create_action('SHOW_CREATE_ROOM_DIALOG', {
        is_show: true,
      });
      return;
    }
    props.create_action('TRIGGER_IF_ENTER_ROOM_DIALOG', {
      room_id,
      is_show: true,
    });
  }, [props]);
  return (
    <>
      <Home />
      <IfEnterRoomDialog />
      <CreateRoomDialog />
      <LoginDialog />
    </>
  )
});
