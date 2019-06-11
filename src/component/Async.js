import React from 'react';

class Async extends React.Component {
    setStateAsync = state=> {
        return new Promise(resolve => {
            this.setState(state, resolve)
        })
    }
}

export default Async