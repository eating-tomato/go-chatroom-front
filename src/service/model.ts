import { GameCurInfo, ServiceResult } from "./interface";
import Axios from "axios";

function generate_axios_instance() {
  const source = Axios.CancelToken.source();
  const axios_instance = Axios.create({
    cancelToken: source.token,
  });
  return {
    axios: axios_instance,
    canceler: source.cancel,
  }
}

export function get_room_cur_info(
    root_id:string,
) : ServiceResult<GameCurInfo> {
  const {
    axios,
    canceler,
  } = generate_axios_instance();
  return {
    canceler: canceler,
    // TODO:
    result: axios.request({}),
  }
}
