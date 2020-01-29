import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import ReactDOM from 'react-dom';

import { browserHistory } from "react-router";

import { routes, onAuthChange } from './../imports/routes/routes';
import './../imports/startup/simple-schema-config';


// track user authentication status
Tracker.autorun(() => {
  // get user authentication status
  const isAuthenticated = !!Meteor.userId();
  // get current page privacy
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  // authenticate page change
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

// track selected note id
Tracker.autorun(() => {
  const selectedNoteId = Session.get('setectedNoteId');

  // close the nav bar
  Session.set('isNavOpen', false);

  // if setectedNoteId changed then change url
  if(selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

// track if navigation menu is open
Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  // create or remove 'is-nav-open' class based on isNavOpen variable
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

// start app
Meteor.startup(() => {
  Session.set('setectedNoteId', undefined);
  Session.set('isNavOpen', false);
  // render the app
  ReactDOM.render(routes, document.getElementById('app'));
});