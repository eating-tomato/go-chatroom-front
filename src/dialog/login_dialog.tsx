import React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';

import { create_action } from '../redux/action';
import { State } from '../redux/interface';
import { service_manager } from '../service/model';
import { LOCALSTORAGE_KEY } from '../interface';

const map_state_to_props = (state:State) => ({
  is_show: state.show_login_dialog,
});

const map_dispatch_to_props = (dispatch:Dispatch<Action<State>>) => bindActionCreators(
  {
    create_action,
  },
  dispatch,
);

type Props = ReturnType<typeof map_state_to_props> & ReturnType<typeof map_dispatch_to_props>;

export const LoginDialog = connect(
  map_state_to_props,
  map_dispatch_to_props,
)((props:Props) => {
  const user_name = React.useRef('');

  function handleClose() {
    props.create_action('SHOW_LOGIN_DIALOG', {
      is_show: false,
    });
  }

  async function handleConfirm() {
    // 发送给后端
    const {
      result,
    } = service_manager.generate_new_user(user_name.current);
    const re = await result;
    console.log(re);
    localStorage.setItem(LOCALSTORAGE_KEY.USER_ID, re.user_id);
    handleClose();
  }
  return <Dialog
  open={props.is_show}
  onClose={handleClose}
  aria-labelledby="form-dialog-title"
>
  <DialogTitle id="form-dialog-title">
    注册
  </DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="昵称"
      type="text"
      fullWidth
      onChange={(e) => { user_name.current = e.target.value; }}
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
</Dialog>;;
})