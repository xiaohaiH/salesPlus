import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

const friends = [
  {name: '小孩',id: 1,friends: [1,3,5,2]},
  {name: '小芯❤',id: 2,friends: [1,2,6,9]},
  {name: '小雨',id: 3,friends: [5,2,8,4]},
  {name: '小雪',id: 4,friends: [2,5,4,7]},
  {name: '小风',id: 5,friends: [1,8,9]},
  {name: '小雷',id: 6,friends: [4,6,7,3]},
  {name: '小电',id: 7,friends: [6,3,]},
  {name: '筱筱',id: 8,friends: [1,3,2]},
  {name: '小东',id: 9,friends: [9,5,2]},
];

/* 定义输出的值 */
const Recursion = () => (
  <Router>
    <div>
      <div>
        <h3>用户</h3>
        <ul>
          {friends.map(
            (val,index) => (
              <li key={val.id}><Link to={`/friends/${val.id}`}>{val.name}</Link></li>
            )
          )}
        </ul>
      </div>
      <RecursionPath match={{url: '/friends',params: {}}} location={{pathname: '/friends'}} />
    </div>
  </Router>
);

const userFriends = ({params,url}) => {
  if(!/^\/friends/.test(url)){
    return false;
  };
  let user = friends.find(p => Number(params.id) === p.id);
  if(!user){
    return false;
  };
  return (
    <div>
      <h3>用户-{user.name}-的朋友</h3>
      <ul>
        {user.friends.map((val) => {
          let friend = friends.find(p => p.id === val);
          return (<li key={friend.id}><Link to={`${url}/${friend.id}`}>{friend.name}</Link></li>)
        })}
      </ul>
    </div>
  )
};
const ensurePath = ({url}) => {
  if(/^\/friends/.test(url)){
    return url;
  };
  return null;
};
const RecursionPath = ({match}) => {
                        return (
                          <div>
                            {userFriends(match)}
                            <Switch>
                              <Route path={`${ensurePath(match)}/:id`} component={RecursionPath} />
                            </Switch>
                          </div>
                        );
                      };

/* 这一块是定义表单自动跳转的 start */
class Form extends Component{
  constructor(props){
    super(props);
    this.handle = this.handle.bind(this);
  }
  handle(){
    this.refs.myForm.submit();
  }
  componentDidMount(){
    this.handle();
  }
  render(){
    return (
      <form ref='myForm' action='http://www.baidu.com' method='get' >
        <input type='text' value='123' />
        <input type='submit' value='提交' />
      </form>
    )
  }
};
new Form();
/* 这一块是定义表单自动跳转的 end */


export default Recursion;