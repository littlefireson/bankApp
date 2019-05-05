import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import About from './about/about';
import Plan from './Plan/Plan';
import PlanDetails from './planDetails/planDetails';
import Heyue from './Plan/heyue';
import SignIn from './signIn/signIn';
import Success from './signIn/success';
import Email from './Plan/email'
render(
 <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/plan" component={Plan}/>
      <Route path="/about" component={About}/>
      <Route path="/planDetails" component={PlanDetails}/>
      <Route path="/heyue" component={Heyue}/>
      <Route path="/email" component={Email}/>
      <Route path="/signIn" component={SignIn}/>
      <Route path="/success" component={Success}/>
    </Switch>
  </BrowserRouter>, document.getElementById('root'));
// ReactDOM.render( 
// <Router >
//     <Route path="/" component={App}/>
//   </Router>
//   , document.getElementById('app'));
registerServiceWorker();
 