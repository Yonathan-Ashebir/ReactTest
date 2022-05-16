import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import './App.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import Home from './lib/js/Home';
import About from './lib/js/About';


class App extends React.Component {
  render() {
    const a = ["Yonathan", "Adom", "Joe", "Carl"]
    main();

    return (
      <div>

        <Provider store={getStore()}>
          <Home cookie={this.props.cookie} />
        </Provider>   <Provider store={getStore()}>
          <About cookie={this.props.cookie} />
        </Provider>
      </div>
    );
  }
}
function getStore() {
  let store = createStore(combineReducers(
    {
      test: (store, action) => {
        let payload = (action.payload) ? action.payload : {};
        console.log("From Test Reducer:");
        console.log(store); console.log(action)
        return { ...store, count: (store != null && store.count != null) ? store.count + 1 : 0 }
      }, deploy: (store, action) => {
        let payload = (action.payload) ? action.payload : {};
        console.log("From  Deploy Reducer:");
        console.log(store); console.log(action)
        return { ...store, count: (store != null && store.count != null) ? store.count + 1 : 0 }
      }
    }),
    { test: { cookie: "yoni-cookie", count: 0 } },
    applyMiddleware((store) => (next) => (action) => { console.log("Form Middle Ware:"); console.log(store.getState()); console.log(next); console.log(action); next(action); })
  )

  return store;
}

function main() {
  let context = ReactReduxContext;
  console.log(context)
}
export default App;

