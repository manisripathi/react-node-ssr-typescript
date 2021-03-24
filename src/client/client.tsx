/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import App from './App';
import theme from './theme/theme';
import GlobalStyles from './theme/globalStyles';
import configureStore from '../store/store/configureStore';

const preloadedState = (window as any).__PRELOADED_STATE__;
const store = configureStore(preloadedState);

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root'));
