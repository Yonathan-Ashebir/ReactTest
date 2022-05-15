import React from 'react';
import { Provider,connect } from 'react-redux';
import './App.css';
import { createStore} from 'redux';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { background: "grey" };
  }
  render() {
    console.log(this.props);
    return (
      <div style={{ backgroundColor: this.state.background }}>
        <h1 style={{ backgroundColor: this.state.background }}>Home</h1>
        {(this.state.background == "grey") ? <MyButton /> : null}
        <RecolorButton parent={this} />
      </div>
    );
  }
}
class About extends React.Component {
  render() { return <h1>About</h1>; }
}
class MyButton extends React.Component {
  render() {
    return <button style={{
      borderRadius: "5px", border: "none", color: "gold", backgroundColor: "black"
    }}
      onClick={(e) => { e.target.style.color = "red" }}> Click ME!</button >
  }
}
class RecolorButton extends React.Component {
  render() {
    const recolor = () => { this.props.parent.setState({ background: 'red' }) }
    return (
      <button style={{
        borderRadius: "5px", border: "none", color: "gold", backgroundColor: "black"
      }}
        onClick={recolor.bind(this)}>Recolor</button >
    )
  }
}


function App() {
  const a = ["Yonathan", "Adom", "Joe", "Carl"]

  return (
    <Provider store={getStore()}>

      <h2>{this.props.cookie}</h2>
    </Provider>
  );
}
function getStore() {

  let store = createStore((state, action) => {
    let payload = (action.payload) ? action.payload : {};
    console.log(state); console.log(action);
    return { ...state, ...payload }
  },
    { cookie: "yoni-cookie" })
  return store;
}
function shareAll(state) {
  return { ...state }
}
connect(shareAll)(App);

export default App;
