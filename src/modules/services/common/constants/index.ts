export const TIME_OUT = 60000;
export const BASE_URL = 'https://617ed6b42ff7e600174bd922.mockapi.io/';

export enum HttpCode {
  success = 200,
}
export enum ResponseCode {
  success = 200,
}
export type APIStatus = 'none' | 'success' | 'failed' | 'fetching';
