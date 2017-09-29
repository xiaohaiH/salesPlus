import fetch from 'dva/fetch';

function parseJson(response){
  return response.json()
}
function checkoutStatus(response){
  if(response.status >= 200&& response.status < 300)return response;
  const error = new Error(response.statusText);
  error.response = response;
  throw error
}
export default function request(url, options){
  return fetch(url, options)
    .then(checkoutStatus)
    .then(parseJson)
    .then(data => data)
    .catch(err => ({ err }))
}