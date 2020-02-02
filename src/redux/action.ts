import { ActionTypes, Payloads, Action } from './interface';

export function create_action(
  type:ActionTypes,
  payload:Payloads[ActionTypes],
):Action<string, Payloads[ActionTypes]> {
  return {
    type,
    payload,
  };
}
