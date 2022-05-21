import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import './App.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxComponent from './lib/js/Home';



class App extends React.Component {
  render() {
    const a = ["Yonathan", "Adom", "Joe", "Carl"]
    const Cxt = React.createContext("default value")
    main();

    return (
      <div>
        <Cxt.Provider value="value givem">
          <Cxt.Consumer>
            {(val) => <div>{val}</div>}
          </Cxt.Consumer>
        </Cxt.Provider>
        <Provider store={getStore()}>
          <ReduxComponent cookie={this.props.cookie} />
        </Provider>
        <Provider store={getStore()}>
          <ReduxComponent cookie={this.props.cookie} />
        </Provider>
      </div>
    );
  }
}
function getStore() {
  let store = createStore(combineReducers(
    {
      test: (state, action) => {
        let payload = (action.payload) ? action.payload : {};
        console.log("From Test Reducer:");
        console.log(state); console.log(action)
        return { ...state, count: (state != null && state.count != null) ? state.count + 1 : 0 }
      }, deploy: (state, action) => {
        let payload = (action.payload) ? action.payload : {};
        console.log("From  Deploy Reducer:");
        console.log(state); console.log(action)
        return null
      }
    }
  ),
    { cookie: "yoni-cookie", count: 0 },
    applyMiddleware((store) => (next) => (action) => {
      console.log("Form Middle Ware:"); console.log(store.getState()); console.log(next); console.log(action);
      store.getState().test.note = "untracked change check"
      next(action);
    })
  )

  return store;
}

function main() {
  let context = ReactReduxContext;
  console.log(context)
}
export default App;

