import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import './App.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxComponent from './lib/js/Home';
import styled from "styled-components"
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isIn: false };
  }
  render() {
    const a = ["Yonathan", "Adom", "Joe", "Carl"]
    const Cxt = React.createContext("default value")
    main();
    const Title = styled.h1`background-color:red;width:100%`
    const toggleView = () => {
      this.state.isIn = !this.state.isIn;
      this.myBtn.current.style.background = (this.state.isIn) ? "blue" : "red";
      this.setState(this.state);
    }
    this.myBtn = React.createRef()

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
        <hr></hr>
        <Title>Styled Elements from here...</Title>
        <Fade in={this.state.isIn} ref={this.myBtn} />
        <button onClick={toggleView.bind(this)}>Change State</button>

      </div>
    );
  }
}
const duration = 1000;

const defaultStyle = {
  opacity: 0,
}

const transitionStyles = {
  entering: {

  },
  entered: { opacity: 1 },
};

const Fade = React.forwardRef(({ in: inProp },ref) => (
  <Transition timeout={duration} in={inProp}>
    {(state) => {
      return <div ref={ref}>
        Some Content:
        <p style={{ ...defaultStyle, transitionDuration: "1s", ...transitionStyles[state] }}>I'm A fade Transition!</p>
      </div>
    }}
  </Transition>

));

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
}
export default App;

