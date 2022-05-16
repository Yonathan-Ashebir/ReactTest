import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

class About extends React.Component {
    render() {
        return (<div>
            <h1>About content here:</h1>
            <h2>{this.props.test.count}</h2>
            <button onClick={() => { this.props.dispatch(getAction()); }}>Click Me!</button>
        </div>);
    }
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
        meta: "yoni-meta",
        payload: "yoni-payload"
    };

    return action;
}

export default connect(shareAll, shareDispatch)(About);