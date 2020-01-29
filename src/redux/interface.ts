export type Payloads = {
  UPDATE_CUR_ROUTE: {
    route:Route;
  };
}

type Route = 'LOGIN'|'PREPARE'|'GAMING'|'OVER';

export type ActionTypes = keyof Payloads;

export interface Action<T = string, P = any> {
  type:T;
  payload:P;
}

export interface State {
  route:Route;
};

export type Reducers = {
  [type in keyof Payloads]:(state:State, action:Action<string, Payloads[type]>) => State;
}
