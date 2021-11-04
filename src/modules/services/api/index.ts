import axios from 'axios';
import {APIStatus, BASE_URL, HttpCode, TIME_OUT} from '../common/constants';

const apiService = axios.create({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
});

type Response = {
  status: APIStatus;
  data?: any;
};

const get = async (path: string, params?: any[]): Promise<Response> => {
  const res = await apiService.get(path, {params});
  if (res.status === HttpCode.success) {
    return {status: 'success', data: res.data};
  }
  return {status: 'failed'};
};
export default {get};
