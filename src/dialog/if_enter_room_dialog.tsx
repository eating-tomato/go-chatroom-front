import React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

import { create_action } from '../redux/action';
import { State } from '../redux/interface';

const map_state_to_props = (state:State) => ({
  is_show: state.if_enter_room_dialog.is_show,
  room_id: state.if_enter_room_dialog.room_id,
});

const map_dispatch_to_props = (dispatch:Dispatch<Action<State>>) => bindActionCreators(
  {
    create_action,
  },
  dispatch,
);

type Props = ReturnType<typeof map_state_to_props> & ReturnType<typeof map_dispatch_to_props>;

export const IfEnterRoomDialog = connect(
  map_state_to_props,
  map_dispatch_to_props,
)((props:Props) => {
  function handleClose() {
    props.create_action('TRIGGER_IF_ENTER_ROOM_DIALOG', {
      is_show: false,
    });
  }

  function handleConfirm() {
    props.create_action('UPDATE_CUR_ROUTE', {
      route: 'PREPARE',
    });
    handleClose();
  }

  return <Dialog
    open={props.is_show}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">
      是否进入房间
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        房间号：{ props.room_id }
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        取消
      </Button>
      <Button onClick={handleConfirm} color="primary">
        确定
      </Button>
    </DialogActions>
  </Dialog>;
})