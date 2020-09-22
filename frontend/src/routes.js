import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Devs from './pages/Devs';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/devs/:id" component={Devs} />
      </Switch>
    </BrowserRouter>
  );
}