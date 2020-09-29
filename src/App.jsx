import React from 'react';

import { Route, Switch } from 'react-router-dom';

import './App.css';

import { NewCase } from './components/NewCase';
import { Admin } from './components/Admin';
import { Home } from './components/Home';
import { Cases } from './components/Admin/Cases';
import { Officers } from './components/Admin/Officers';

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/newcase" component={NewCase} exact />
      <Route path="/admin" component={Admin} exact />
      <Route path="/cases" component={Cases} exact />
      <Route path="/officers" component={Officers} exact />
    </Switch>
  );
};

export default App;
