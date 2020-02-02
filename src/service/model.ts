import Axios, { AxiosInstance } from 'axios';
import { ServiceResult } from './interface';
import { CREATE_ROOM_API, REGISTER_API } from '../api';

class ServiceManager {
  private generate_axios_instance() {
    const source = Axios.CancelToken.source();
    const axios_instance = Axios.create({
      cancelToken: source.token,
    });
    return {
      axios: axios_instance,
      canceler: source.cancel,
    };
  }

  private _request<T>(request:(axios:AxiosInstance) => Promise<T>) : ServiceResult<T> {
    const {
      axios,
      canceler,
    } = this.generate_axios_instance();
    return {
      canceler,
      result: request(axios),
    }
  }

  public generate_new_room(room_name:string):ServiceResult<{room_id:string}>  {
    return this._request((axios) => {
      return axios.request({
        url: CREATE_ROOM_API,
        method: 'post',
        data: {
          room_name,
        },
      });
    });
  }

  public generate_new_user(user_name:string):ServiceResult<{user_id:string}> {
    return this._request((axios) => {
      return axios.request({
        url: REGISTER_API,
        method: 'post',
        data: {
          username: user_name,
        },
      });
    });
  }

  public update_seat_info(user_id:string, idx:number) {
    // TODO: socket
    return this._request((axios) => {
      return axios.request({});
    });
  }
}

export const service_manager = new ServiceManager();