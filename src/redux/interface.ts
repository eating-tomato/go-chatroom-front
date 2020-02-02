export type Payloads = {
  UPDATE_CUR_ROUTE:{
    route:Route;
  };
  TRIGGER_IF_ENTER_ROOM_DIALOG: {
    is_show:boolean;
    room_id?:string;
  };
  SHOW_CREATE_ROOM_DIALOG: {
    is_show:boolean;
  };
  SHOW_LOGIN_DIALOG: {
    is_show:boolean;
  };
  UPDATE_CUR_ROOM_ID: {
    room_id:string|null;
  };
}

type Route = ''|'PREPARE'|'GAMING'|'OVER';

export type ActionTypes = keyof Payloads;

export interface Action<T = string, P = any> {
  type:T;
  payload:P;
}

export interface State {
  route:Route;
  if_enter_room_dialog:{
    is_show:boolean;
    room_id?:string;
  };
  show_create_room_dialog:boolean;
  cur_room_id:string|null;
  show_login_dialog:boolean;
}

export type Reducers = {
  [type in keyof Payloads]:(state:State, action:Action<string, Payloads[type]>) => State;
}
