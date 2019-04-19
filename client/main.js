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
  // authenticate page change
  onAuthChange(isAuthenticated);
});

// track selected note id
Tracker.autorun(() => {
  const selectedNoteId = Session.get('setectedNoteId');

  // if setectedNoteId changed then change url
  if(selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

// start app
Meteor.startup(() => {
  Session.set('setectedNoteId', undefined);
  // render the app
  ReactDOM.render(routes, document.getElementById('app'));
});