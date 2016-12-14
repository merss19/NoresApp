import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory,Redirect,IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import './app.css';
import { syncHistoryWithStore } from 'react-router-redux';
import { getRoutes } from './routes';

/*ReactDOM.render((
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={ App }>
                    <IndexRoute component = {Form} />
                    <Route path="/notes" component={ Notes }/>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('root')
);*/

const syncedHistory = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={syncedHistory} routes={getRoutes(store.getState)} />
    </Provider>,
    document.getElementById('root')
);
