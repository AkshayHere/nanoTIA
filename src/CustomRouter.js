import React, { Component, lazy, Suspense } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createReducerManager } from 'redux/reducerManager';
import { applyMiddleware, compose, createStore } from 'redux';
import { logger, commonProcessors } from 'redux/middlewares';
import { reducer } from 'redux/reducers';
import rootSaga from 'saga/saga';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
// import AnimatedWait from 'components/AnimatedWait';
// import Notifier from 'components/Notifier';
import { SnackbarProvider } from 'notistack';

const history = createBrowserHistory();

const staticReducers = {
  router: connectRouter(history),
  common: reducer
}



//configure redux store
const configureStore = (initialState) => {

  //init router middleware
  const routeMiddleware = routerMiddleware(history);

  //init saga middleware
  const sagaMiddleware = createSagaMiddleware();
  
  // //init dynamic middlewares
  // const dynamicMiddlewares = createDynamicMiddlewares();

  // //dynamic middlewares
  // const middlewareEnhancer = applyMiddleware(logger, routeMiddleware, commonProcessors, sagaMiddleware, dynamicMiddlewares.enhancer);

  // //build enhancers
  // const enhancers = [middlewareEnhancer]
  // const composedEnhancers = compose(...enhancers)

  //init reducerManager
  const reducerManager = createReducerManager(staticReducers)

  const store = createStore(
    reducerManager.reduce,
    initialState,
    applyMiddleware(logger, routeMiddleware, commonProcessors, sagaMiddleware)
  )

  store.reducerManager = reducerManager;
  store.sagaMiddleware = sagaMiddleware;

  return store
}

//init the store
const store = configureStore();

//run sagas
store.sagaMiddleware.run(rootSaga);

window.store = store;

const Dashboard = (lazy(() => (
  import(/* webpackChunkName: "Dashboard" */ 'pages/home/App')
)));

const Article = (lazy(() => (
  import(/* webpackChunkName: "Article" */ 'pages/article/App')
)));


// class CustomRouter extends Component {

//   componentDidMount() {}

//   render() {
//     return (
//       <Provider store={store}>
//         <SnackbarProvider
//           maxSnack={3}
//           anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//         >
//           <ConnectedRouter history={history}>
//             <Suspense fallback={<div />}>
//               <Switch>
//               <Route exact path="/debug" component={Debug2} />
//                 {/* Authentication */}
//                 <Route exact path="/" component={SignIn} />
//                 <Route exact path="/signin" component={SignIn} />

//                 {/* Applications */}
//                 <Route exact path="/applications" component={Applications} />
//                 <Route exact path="/applications/details/:applicationRefNo" component={ApplicationDetailView} />

//                 <Route exact path="/dashboard" component={Dashboard} />

//                 <Route exact path="/policies" component={Policies} />


//                 <Route exact path="/reports" component={Reports} />

                

//                 <Route exact path="/cancellations" component={Cancellations} />

//                 <Route exact path="/tasks/view/:taskRefNo" component={TaskView} />

//                 <Route exact path="/manage-agents" component={ManageAgents} />
//                 <Route exact path="/manage-agents/create" component={AgentCreate} />
//                 <Route exact path="/manage-agents/update/:agentRefNo" component={AgentUpdate} />

//                 <Route exact path="/ncd-enquiry/" component={NCDEnquiry} />

//               </Switch>
//             </Suspense>
//           </ConnectedRouter>
//           <AnimatedWait />
//           <Notifier />
//         </SnackbarProvider>
//       </Provider>
//     );
//   }
// }

export default function CustomRouter() {
  return (
    <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <ConnectedRouter history={history}>
            <Suspense fallback={<div />}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/topic" component={Article} />
              </Switch>
            </Suspense>
          </ConnectedRouter>
          {/* <AnimatedWait /> */}
          {/* <Notifier /> */}
        </SnackbarProvider>
      </Provider>
  );
}

// export default CustomRouter;