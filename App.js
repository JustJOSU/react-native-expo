import 'react-native-gesture-handler';

import React from 'react';
import { createStore } from 'redux';
import rootReducer from './src/reducers/index';
import { Provider } from 'react-redux';

import Tabs from './src/TabConfig';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
