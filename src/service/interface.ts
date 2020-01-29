import Axios, { Canceler, CancelToken } from 'axios';

export type GameCurInfo = IsGamingInfo|NonGamingInfo;

interface IsGamingInfo {
  is_gaming:true;
  cur_player:string;
  cur_canvas_json:string;
  chat_history_json:string;
}

interface NonGamingInfo {
  is_gaming:false;
}

export interface ServiceResult<T> {
  canceler:Canceler;
  result:Promise<T>;
}