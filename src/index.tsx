import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);


reportWebVitals();
