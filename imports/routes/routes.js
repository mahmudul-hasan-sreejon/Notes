import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';


const onEnterNotePage = nextState => {
  Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};

// authenticate page changes
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  // get current page' authentication status
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  // check authentication and redirect accordingly
  if(isUnauthenticatedPage && isAuthenticated) { // if on unauthenticated page and user logged in
    browserHistory.replace('/dashboard');
  }
  else if(isAuthenticatedPage && !isAuthenticated) { // if on authenticated page and user not logged in
    browserHistory.replace('/');
  }
};

export const globarOnEnter = nextState => {
  // get last route
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  // set privacy for last route
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const globarOnChange = (prevState, nextState) => {
  globarOnEnter(nextState);
};


// app routes
export const routes = (
  <Router history={ browserHistory }>
    <Route onEnter={ globarOnEnter } onChange={ globarOnChange }>
      <Route path="/" component={ Login } privacy='unauth' />
      <Route path="/signup" component={ Signup } privacy='unauth' />
      <Route path="/dashboard" component={ Dashboard } privacy='auth' />
      <Route path="/dashboard/:id" component={ Dashboard } privacy='auth' onEnter={ onEnterNotePage } onLeave={ onLeaveNotePage } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);