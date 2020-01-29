import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from 'redux';

import { get_room_cur_info } from './service/model';
import { State } from './redux/interface';
import { create_action } from './redux/action';
import { LoginView } from './login';

const map_state_to_props = (state:State) => ({
  route: state.route,
});

const map_dispatch_to_props = (dispatch:Dispatch<Action<State>>) => bindActionCreators(
  {
    create_action,
  },
  dispatch,
);

type Props = ReturnType<typeof map_state_to_props> & ReturnType<typeof map_dispatch_to_props>;

export const App = connect(
    map_state_to_props,
    map_dispatch_to_props,
)((props:Props) => {
  const is_exits = React.useRef(true);
  React.useEffect(() => {
    const room_id = localStorage.getItem('__room_id');
    // TODO: 检查当前运行进度
    if (!room_id) {
      props.create_action('UPDATE_CUR_ROUTE', {
        route: 'PREPARE',
      });
      return;
    }
    const {
      canceler,
      result,
    } = get_room_cur_info(room_id);
    result.then((val) => {
      if (!is_exits.current) { return; }
      if (!val.is_gaming) {
        // TODO:
        localStorage.removeItem('__room_id');
        return;
      }
    });
    return () => {
      is_exits.current = false;
      canceler();
    };
  }, []);

  switch (props.route) {
    case 'LOGIN':
      return <LoginView />;
    case 'OVER':
    case 'PREPARE':
      return null;
    case 'GAMING':
      return null;
    default:
      return null;
  }
});