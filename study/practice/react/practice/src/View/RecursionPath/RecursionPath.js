import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

/* 定义所有用户信息 */
const friends = [
  {id: 0,name: '小海',friends: [2,4]},
  {id: 1,name: '小东',friends: [1,3]},
  {id: 2,name: '筱筱',friends: [2,3,4]},
  {id: 3,name: '小雪',friends: [1,3,4]},
  {id: 4,name: '小星',friends: [1,4]}
];

/* 返回需要寻找的用户信息 */
const findFriend = (id) => friends.find((f) => f.id === Number(id));

/* 定义递归路径模块 */
const Recursion = ({match}) => {
  let user = findFriend(match.params.id);
  return (
    <div>
    {/* 定义是谁要找朋友 */}
      <h3>{user.name}</h3>
    {/* 他的朋友的数量 */}
      <ul>
        {user.friends.map((val) => (
          <li key={val}>
            <Link to={`${match.url}/${val}`}>{findFriend(val).name}</Link>
          </li>
        ))}
      </ul>
    {/* 定义路由的路径 */}
      <Route path={`${match.url}/:id`} component={Recursion} />
    </div>
  );
};

/* 导出递归路径块 */
const RecursionPath = () => (
  <Router>
    <Recursion match={{params: {id: 0},url: '/friend'}} />
  </Router>
);

export default RecursionPath;