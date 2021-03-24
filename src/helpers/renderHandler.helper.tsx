import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import * as ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import App from '../client/App';
import theme from '../client/theme/theme';
import GlobalStyles from '../client/theme/globalStyles';
import renderFullPage from './renderFullPage.helper';
import configureStore from '../store/store/configureStore';
import cache from '../store/cache/cache';

const { extractCritical } = createEmotionServer(cache);

function handleRender(response: any) {
  const sheets = new ServerStyleSheets();

  // Compile an initial state
  const preloadedState = { ...response };

  // Create a new Redux store instance
  const store = configureStore(preloadedState);

  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <CacheProvider value={cache}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <App />
          </ThemeProvider>
        </Provider>
      </CacheProvider>,
    ),
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  // Grab the CSS from emotion
  const styles = extractCritical(html);

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  return renderFullPage(html, `${css} ${styles.css}`, finalState);
}

export default handleRender;
