import dva from 'dva';
import './index.css';
import { browserHistory as history } from 'dva/router';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  history,
  onError(e) {
    message.error(e.message, 3);
  },
});

// 2. Plugins
app.use(createLoading({
  global: true
}));

// 3. Model
// app.model(require('./models/Login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
