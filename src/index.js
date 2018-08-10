// React
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

// Components
import NavBar from './components/NavBar';
import App from './App';

// Containers
import CodeAssist from './containers/CodeAssist';
import CodeEditor from './containers/CodeEditor';

// React Router
import {
  BrowserRouter as Router,
  Route
  // Link
} from 'react-router-dom';

// CSS
import './index.css';
import './css/styles.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router>
			<div>
				<NavBar />
				<Route exact path="/code-assist/" component={CodeAssist}/>
				<Route path="/code-assist/code-editor" component={CodeEditor}/>
			</div>
		</Router>
	</Provider>

	, document.getElementById('root'));

registerServiceWorker();
