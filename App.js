import 'react-native-gesture-handler';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './src/Reducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';

import Tabs from './src/TabConfig';

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  );
}