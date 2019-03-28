import SimpleSchema from 'simpl-schema';

import { Meteor } from 'meteor/meteor';


SimpleSchema.defineValidationErrorTransform(err => {
  return new Meteor.Error(400, err.message);
});
