import React, { useDebugValue } from 'react';
import { Provider, connect, useStore, useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';

class ReduxComponent extends React.Component {
    static count =0;
    constructor(props){
        super(props);
       ReduxComponent.count++;
       console.log("Redux Component created: "+ ReduxComponent.count);
       this.obj=0;
    }
    render() {
        this.obj++;
        console.log("Obj: "+this.obj)
        return (<div>
            <h1>Home content here:</h1>
            <h2>{this.props.test.count}</h2>
          
            <button onClick={() => { this.props.dispatch(getAction());}}>Click Me!</button>
            <FunctionElement/>
        </div>);
    }
}
function FunctionElement(props){
    console.log("From Function Element")
    console.log(useStore())
    console.log(useSelector(state=>state,()=>true))
    console.log(useDispatch())
    return <p>Funcion Element Here!</p>
}
function shareAll(state) {
    return { ...state }
}
function shareDispatch(dispatch) {
    return { dispatch: dispatch };
}
function getAction() {
    let action = {
        type: "yoni-type",
        meta: "yoni-meta"
    };

    return action;
}

export default connect(shareAll, shareDispatch)(ReduxComponent);