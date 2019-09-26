import React, { Component } from 'react';

import Main from './components/Main';
import Header from './components/home/Header'

class App extends Component {
    render() {
        return (
            <div className="App container">
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;
