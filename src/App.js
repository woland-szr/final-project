import React from 'react';

import { Route, Switch } from 'react-router-dom';

import './App.css';

import { NewCase } from './components/NewCase';
import { Admin } from './components/Admin';
import { Home } from './components/Home';
import { Cases } from './components/Admin/Cases';
import { Officers } from './components/Admin/Officers';

class App extends React.Component {
    render() {
        return (

                <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/newcase" component={NewCase} exact={true} />
                <Route path="/admin" component={Admin} exact={true} />
                <Route path="/cases" component={Cases} exact={true} />
                <Route path="/officers" component={Officers} exact={true} />
                </Switch>
            
        )
    }
}

export default App;
