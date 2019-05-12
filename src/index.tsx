import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import Firebase from './config/firebase'
import RouteMap from './config/routes'
import { RawTheme } from './config/theme'

import './index.css';
import registerServiceWorker from './registerServiceWorker'

import store from './state/store'

const theme = createMuiTheme(RawTheme);

// Init firebase application
Firebase.init()

// Render web application
ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<RouteMap />
		</MuiThemeProvider>
	</Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
