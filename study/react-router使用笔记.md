
## 一: Route
### 作用：当页面的访问地址与 Route 上的 path 匹配时,就渲染出对应的 UI 界面
Route 自带三个 render method 和三个 props,每种 render method 都有不同的应用场景,同一个Route 应该只使用一种 render method ,大部分情况下使用 component
```
render methods 分别是：    props 分别是：    所有的 render method 都会传入这些 props。
  <Route component>           match
  <Route render>              location
  <Route children>            history

  例: component:
        <Route path="/user/:username" component={User} />
        const User = ({ match }) => {return <h1>Hello {match.params.username}!</h1>}

  例: render: func     此方法适用于内联渲染
        <Route path="/home" render={() => <h1>Home</h1} />

  例: children: func   想知道访问地址是否被匹配,然后改变下别的东西,而不仅仅是对应的页面
        <ul>
          <ListItemLink to="/somewhere" />
          <ListItemLink to="/somewhere-ele" />
        </ul>

        const ListItemLink = ({ to, ...rest }) => (
          <Route path={to} children={({ match }) => (
            <li className={match ? 'active' : ''}>
              <Link to={to} {...rest} />
            </li>
          )}
        )



path: string    如果不给path,那么路由将总是匹配
  例: <Route path="/users/:id" component={User} />

exact: bool     如果为 true,path 为 '/one' 的路由将不能匹配 '/one/two',反之,亦然。

strict: bool    对路径末尾斜杠的匹配。如果为 true。path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'。
如果要确保路由没有末尾斜杠,那么 strict 和 exact 都必须同时为 true

<Link>  为你的应用提供声明式,无障碍导航。
    to:  跳转到指定路径
    例:  <Link to="/courses" />    无附带参数跳转.
        <Link to={{pathname: '/course',search: '?sort=name',state: { price: 18 }}} />   携带参数跳转到指定路径
    replace: bool       ----      等于true 时,点击链接后将使用新地址替换掉上一次访问的地址




<NavLink>   Link 的特殊版,为页面导航准备的。因为导航需要有 “激活状态”。
    activeClassName: String       ----      导航选中激活时候应用的样式名,默认样式名为 active
        例:  <NavLink to="/about" activeClassName="selected">MyBlog</NavLink>
    activeStyle: object           ----      如果不想使用样式名就直接写style
        例:  <NavLink to="/about" activeStyle={{ color: 'green', fontWeight: 'bold' }}>MyBlog</NavLink>
    exact: bool                   ----      若为 true,只有当访问地址严格匹配时激活样式才会应用
    strict: bool                  ----      若为 true,只有当访问地址后缀斜杠严格匹配（有或无）时激活样式才会应用
    isActive: func                ----      决定导航是否激活,或者在导航激活时候做点别的事情。不管怎样,它不能决定对应页面是否可以渲染。



<Switch>    只渲染出第一个与当前访问地址匹配的 <Route> 或 <Redirect>。
    children: node                ----      Switch 下的子节点只能是 Route 或 Redirect 元素,只有与当前访问地址匹配的第一个子节点才会被渲染, Route 元素用它们的 path 属性匹配, Redirect 元素使用它们的 from 属性匹配。如果没有对应的 path 或 from,那么它们将匹配任何当前访问地址。
    例: <Switch><Route/><Route/></Switch>


<Redirect>                        ----      Redirect 渲染时将导航到一个新地址,这个新地址覆盖在访问历史信息里面的本该访问的那个地址
    to:           重定向的 URL 字符串 或 location 对象
    push: bool    若为真,重定向操作将会把新地址加入到访问历史记录里面,并且无法回退到前面的页面
    from: string  需要匹配的将要被重定向路径。

<Prompt>          当用户离开当前页面前做出一些提示。
    message: func || string     
    when: bool  通过设置一定条件要决定是否启用 Prompt
      例:  <Prompt when={this.state.dirty} message={location => (`Are you sue you want to go to ${location.pathname}?` )} />


  ``` 

## 二: history
```
  "browser history" - history 在 DOM 上的实现,用于支持 HTML5 history API 的浏览器
  "hash history"    - history 在 DOM 上的实现,用于旧版浏览器。
  "memory history"  - history 在内存上的实现,用于测试或非 DOM 环境（例如 React Native）。

  history 对象通常具有以下属性和方法：
    length: number          浏览历史堆栈中的条目数
    action: string          路由跳转到当前页面执行的动作,分为 PUSH, REPLACE, POP
    location: object        当前访问地址信息组成的对象,具有如下属性：
      pathname: string  -   URL路径
      search: string    -   URL中的查询字符串
      hash: string      -   URL的 hash 片段
      state: string     -   例如执行 push(path, state) 操作时,location 的 state 将被提供到堆栈信息里,state 只有在 browser 和 memory history 有效。
    push(path, [state])     在历史堆栈信息里加入一个新条目。
    replace(path, [state])  在历史堆栈信息里替换掉当前的条目
    go(n)                   将 history 堆栈中的指针向前移动 n。
    goBack()                等同于 go(-1)
    goForward               等同于 go(1)
    block(prompt)           阻止跳转
  
  history 对象是可变的,建议从 <Route> 的 prop 里来获取 location,而不是从 history.location 直接获取,这样可以保证 React 在生命周期中的钩子函数正常执行
    例: 
      class Comp extends React.Component {
        componentWillReceiveProps(nextProps) {
          // locationChanged
          const locationChanged = nextProps.location !== this.props.location

          // 错误方式,locationChanged 永远为 false,因为history 是可变的
          const locationChanged = nextProps.history.location !== this.props.history.location
        }
      }

  location: 指你当前的位置,将要去的位置,或是之前所在的位置
    例: 
    {
      key: 'sdfad1'
      pathname: '/about',
      search: '?name=minooo'
      hash: '#sdfas',
      state: {
        price: 123
      }
    }
    在以下情景中可以获取 location 对象
      * 在 Route component 中,以 this.props.location 获取
      * 在 withRouter 中,以 this.props.location 的方式获取
      * 在 Route render 中,以 ({location}) => () 方式获取
      * 在 Route children 中,以 ({location}) => () 方式获取

    location 对象不会发生改变,因此可以在生命周期的回调函数中使用 location 对象来查看当前页面的访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用
      例: 
      componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
          // 已经跳转了！
        }
      }
  
  match: 该包含了 <Route path> 如何与 URL 匹配的信息,具有以下属性：
    params: object 路径参数,通过解析 URL 中的动态部分获得键值对
    isExact: bool 为 true 时,整个 URL 都需要匹配
    path: string 用来匹配的路径模式,用于创建嵌套的 <Route>
    url: string URL 匹配的部分,用于嵌套的 <Link>
    
    在以下情景中可以获取 match 对象
      * 在 Route component 中，以 this.props.match获取
      * 在 withRouter 中，以 this.props.match的方式获取
      * 在 Route render 中，以 ({match}) => () 方式获取
      * 在 Route children 中，以 ({match}) => () 方式获取
      * matchPath 的返回值
      
    当一个 Route 没有 path 时，它会匹配一切路径。
  ```
  
## 三: basename: string
### 作用：为所有位置添加一个基准URL
使用场景: 假如你需要把页面部署到服务器的二级目录,你可以使用 basename 设置到此目录
```
例: 
  <BrowserRouter basename="/minooo" />
  <Link to="/react" />                      // 最终渲染为 <a href="/minooo/react">
  ```

## 四: forceRefresh: bool
### 作用：当浏览器不支持 html5 的 history API 时强制刷新页面。
```
例: 
  const supportsHistory = 'pushState' in window.history
  <BrowserRouter forceRefresh={!supportsHistory} />
```

## 五: children: node
### 作用：渲染唯一子元素。
使用场景：作为一个 Reac t组件,天生自带 children 属性。


## 六: keyLength: number
### 作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时,每次该路由下的 location.key都会改变,可以通过 key 的变化来刷新页面。）
```
例: 
  <BrowserRouter keyLength={12} />
```

## 七: getUserConfirmation: func
### 作用：导航到此页面前执行的函数,默认使用 window.confirm
使用场景：当需要用户进入页面前执行什么操作时可用,用的不多
```
例: 
  const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message)
    callback(allowTransition)
  }

<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />
```
