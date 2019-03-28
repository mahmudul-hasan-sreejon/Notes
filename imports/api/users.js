import { Accounts } from 'meteor/accounts-base';

import SimpleSchema from 'simpl-schema';


// validate new user email
Accounts.validateNewUser(user => {
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
});
