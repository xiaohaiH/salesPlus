import { parse } from 'query-string';

export const verify = (user) => {
  const { username, password } = parse(user);
  if(username === 'a' && password === 'a'){
    return {
      code: 'success',
      userInfo: {
        username: 'a',
        token: '12345',
        permission: 'advanced'
      }
    }
  }else if(username === 'b' && password === 'b'){
    return {
      code: 'success',
      userInfo: {
        username: 'b',
        token: '12345',
        permission: 'common'
      }
    }
  }else{
    return {
      code: 'fail',
      userInfo: {}
    }
  }
}