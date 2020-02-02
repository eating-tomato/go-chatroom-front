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
  TextField,
} from '@material-ui/core';

import { create_action } from '../redux/action';
import { State } from '../redux/interface';
import { service_manager } from '../service/model';

const map_state_to_props = (state:State) => ({
  is_show: state.show_create_room_dialog
});

const map_dispatch_to_props = (dispatch:Dispatch<Action<State>>) => bindActionCreators(
  {
    create_action,
  },
  dispatch,
);

type Props = ReturnType<typeof map_state_to_props> & ReturnType<typeof map_dispatch_to_props>;

export const CreateRoomDialog = connect(
  map_state_to_props,
  map_dispatch_to_props,
)((props:Props) => {
  const room_name = React.useRef('');
  function handleClose() {
    props.create_action('SHOW_CREATE_ROOM_DIALOG', {
      is_show: false,
    });
  }
  async function handleConfirm() {
    // 发送给后端
    const {
      result,
    } = service_manager.generate_new_room(room_name.current);
    props.create_action('UPDATE_CUR_ROOM_ID', {
      room_id: (await result).room_id,
    });
    props.create_action('UPDATE_CUR_ROUTE', {
      route: 'PREPARE',
    });
    handleClose();
  }
  return <Dialog
    open={props.is_show}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">
      设置房间昵称
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        给你的房间设置一个好听的昵称吧
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        label="房间昵称"
        type="text"
        fullWidth
        onChange={(e) => { room_name.current = e.target.value; }}
      />
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