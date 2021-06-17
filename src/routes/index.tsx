import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Detalhes from '../pages/Detalhes';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/detalhes/:campeao" component={Detalhes} />
  </Switch>
);

export default Routes;
