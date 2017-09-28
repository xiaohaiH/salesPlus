import dva from 'dva';
import './index.css';
import { browserHistory as history } from 'dva/router';

// 1. Initialize
const app = dva({
  history
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/Login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
