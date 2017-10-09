import fetch from 'dva/fetch';

const resJSON = (res) => {
  return res.json()
};
const resStatus = (res) => {
  if(res.ok){
    return res
  };

  const error = new Error(res.statusText);
  error.res = res;
  console.log('请求数据失败了')
  throw error;
};

export default function req(url,{ method = 'POST', headers = { 'Content-Type': 'application/x-www-form-urlencoded' }, mode = 'cors' , ...body }){
  return fetch(url,{ method, headers, mode, ...body})
    .then(resStatus)
    .then(resJSON)
    .then(data => data)
    .catch(err => err)
}