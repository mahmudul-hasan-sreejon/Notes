import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';


// user route access types
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  // if user has logged in
  if(Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

// authenticate page changes
export const onAuthChange = (isAuthenticated) => {
  // get current browser path
  const pathname = browserHistory.getCurrentLocation().pathname;
  // get current page' authentication status
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // check authentication and redirect accordingly
  if(isUnauthenticatedPage && isAuthenticated) { // if on unauthenticated page and user logged in
    browserHistory.replace('/dashboard');
  }
  else if(isAuthenticatedPage && !isAuthenticated) { // if on authenticated page and user not logged in
    browserHistory.replace('/');
  }
};


// app routes
export const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Login } onEnter={ onEnterPublicPage }/>
    <Route path="/signup" component={ Signup } onEnter={ onEnterPublicPage }/>
    <Route path="/dashboard" component={ Dashboard } onEnter={ onEnterPrivatePage }/>
    <Route path="/dashboard/:id" component={ Dashboard } onEnter={ onEnterPrivatePage }/>
    <Route path="*" component={ NotFound }/>
  </Router>
);