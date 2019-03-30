import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';
import moment from 'moment';


export const Notes = new Mongo.Collection('notes');

// create `notes` publication if on server
if(Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({ userId: this.userId });
  });
}

// methods for note's operations
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

    // validate the note id
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    // remove note
    return Notes.remove({ _id, userId: this.userId });
  },

  'notes.update'(_id, updates) {
    // check user authenticity
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // validate the note id, title and body
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({ _id, ...updates });

    // update note
    Notes.update(
      {
        _id,
        userId: this.userId
      },
      {
        $set: {
          updatedAt: moment().valueOf(),
          ...updates
        }
      }
    );
  }
});
