import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StarDashboardPage from '../components/StarDashboardPage';
import AddStarPage from '../components/AddStarPage';
//import EditStarPage from '../components/EditStarPage';
//import HelpPage from '../components/HelpPage';
//import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => ( 
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={StarDashboardPage} exact={true} />
        <Route path="/create" component={AddStarPage} />

      </Switch>
    </div>
  </BrowserRouter>
);  

export default AppRouter;