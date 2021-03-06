import React, { Component, lazy, Suspense } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { commonProcessors } from 'redux/middlewares';
import { reducer } from 'redux/reducers';
import rootSaga from 'saga/saga';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';

const history = createBrowserHistory();

//configure redux store
const configureStore = (initialState) => {

  //init router middleware
  const routeMiddleware = routerMiddleware(history);

  //init saga middleware
  const sagaMiddleware = createSagaMiddleware();

  const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    common: reducer
  });

  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(logger, routeMiddleware, commonProcessors, sagaMiddleware)
  )

  // store.reducerManager = reducerManager;
  store.sagaMiddleware = sagaMiddleware;
  return store
}

//init the store
const store = configureStore();
store.sagaMiddleware.run(rootSaga);
window.store = store;

const Dashboard = (lazy(() => (
  import(/* webpackChunkName: "Dashboard" */ 'pages/home/App')
)));

const Post = (lazy(() => (
  import(/* webpackChunkName: "Post" */ 'pages/post/App')
)));

const ErrorPage = (lazy(() => (
  import(/* webpackChunkName: "ErrorPage" */ 'pages/common/ErrorPage')
)));

const Debug = (lazy(() => (
  import(/* webpackChunkName: "ErrorPage" */ 'pages/debug')
)));

export default function CustomRouter() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/debug" component={Debug} />
            <Route exact path="/post/:slug" component={Post} />
            <Route exact path="/error" component={ErrorPage} />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
}