import Mock from 'mockjs';
import uuid from 'uuid';

import { CREATE_ROOM_API, REGISTER_API } from '../api';

interface IOptions {
  url:string;
  type:string;
  body:any;
}

export function init_mock() {
  Mock.mock(CREATE_ROOM_API, 'post', function(options:IOptions) {
    if (options.body && options.body.room_name) {
      return {

      }
    }
  });
  
  Mock.mock(REGISTER_API, 'post', function(options:IOptions) {
    console.log(options);
    if (options.body && options.body.username) {
      return {
        code: '200',
        data: {
          Username: options.body.username,
          Id: uuid(),
          Score: 0,
          RoomId: '',
        },
      };
    }
  });
}