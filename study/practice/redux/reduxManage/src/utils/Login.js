import fetch from 'dva/fetch';
const resJson = (res) => res.json();
const checkStatus = (res) => {
  if(res.status >= 200 && res.status < 300){
    return res
  }
  const err = new Error(res.statusText);
  err.response = res;
  throw err
}
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
export default function res(url, { method = 'POST', headers = headers, body = '', ...params }){
  return fetch(url, { method, headers, body, ...params })
    .then(checkStatus)
    .then(resJson)
    .then(data => data)
    .catch(err => err)
}