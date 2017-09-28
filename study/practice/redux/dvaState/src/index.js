import dva from 'dva';
import './index.css';
import { hashHistory  } from 'dva/router';
// import createHistory  from 'history/createHashHistory';
// 1. Initialize
const app = dva({
  history: hashHistory
});

// 2. Plugins
// app.use();

// 3. Model
app.model(require('./models/Login/index'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');