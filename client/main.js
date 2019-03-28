import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import './../imports/startup/simple-schema-config';

import { routes, onAuthChange } from './../imports/routes/routes';


// track user authentication status
Tracker.autorun(() => {
  // get user authentication status
  const isAuthenticated = !!Meteor.userId();
  // authenticate page change
  onAuthChange(isAuthenticated);
});

// start app
Meteor.startup(() => {
  // render the app
  ReactDOM.render(routes, document.getElementById('app'));
});
