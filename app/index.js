/* eslint-disable promise/always-return */

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStorage } from './storage/base-storage';
import Root from './containers/root';
import { configureStore, history } from './store/configureStore';
import 'app/styles/app.global.scss';

getInitialStorage()
  .then((initialStorage) => {
    const store = configureStore(initialStorage);

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin();
    render(
      <MuiThemeProvider>
        <AppContainer>
          <Root store={store} history={history} />
        </AppContainer>
      </MuiThemeProvider>,
      document.getElementById('root')
    );

    if (module.hot) {
      module.hot.accept('./containers/Root', () => {
        const NextRoot = require('./containers/root'); // eslint-disable-line global-require

        render(
          <MuiThemeProvider>
            <AppContainer>
              <NextRoot store={store} history={history} />
            </AppContainer>
          </MuiThemeProvider>,
          document.getElementById('root')
        );
      });
    }
  })
  .catch((err) => console.log(err))
;

