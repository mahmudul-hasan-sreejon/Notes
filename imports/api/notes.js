import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import moment from 'moment';
import SimpleSchema from 'simpl-schema';


export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'() {
    // check user authenticity
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // create note
    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment.valueOf()
    });
  },

  'notes.remove'(_id) {
    // check user authenticity
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // validate the noteId
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    // remove note
    return Notes.remove({ _id, userId: this.userId });
  }
});
