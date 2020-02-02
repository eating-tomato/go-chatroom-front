import React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { create_action } from '../redux/action';
import { State } from '../redux/interface';
import { PrepareView } from './prepare';
import { GamingView } from './gaming';
import { OverView } from './over';

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

export const Home = connect(
  map_state_to_props,
  map_dispatch_to_props,
)((props:Props) => {
  switch (props.route) {
    case 'PREPARE':
      return <PrepareView />
    case 'GAMING':
      return <GamingView />
    case 'OVER':
      return <OverView />
    default:
      return <div>
        <h1>你画我猜</h1>
        <p>主页</p>
      </div>;
  }
});
