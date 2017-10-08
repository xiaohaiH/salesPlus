import fetch from 'dva/fetch';

const resJSON = (res) => res.json();
const resStatus = (res) => {
  if(res.ok){
    return res
  };

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export default function req(url,{ method = 'POST', header = { 'Content-Type': 'application/x-www-form-urlencoded' }, ...body }){
  return fetch(url,{ method, header, ...body})
    .then(resStatus)
    .then(resJSON)
    .then(data => data)
    .catch(err => err)
}