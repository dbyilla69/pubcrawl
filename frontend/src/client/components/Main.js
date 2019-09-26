import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home/Home';
import Publisher from './publisher/Publisher';

function Main() {
  return (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/publisher/:id' component={Publisher}/>
        </Switch>
    </main>
  );
}

export default Main;
