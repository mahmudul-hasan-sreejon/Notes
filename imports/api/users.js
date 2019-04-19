import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import SimpleSchema from 'simpl-schema';


export const validateNewUser = user => {
  // get email address
  const email = user.emails[0].address;

  // validate email address
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    }
  }).validate({ email });

  return true;
};

// if on server validate new user email
if(Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}