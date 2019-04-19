import { Meteor } from 'meteor/meteor';

import expect from 'expect';

import { Notes } from "./notes";


if(Meteor.isServer) {
  describe('notes', function() {
    // TEST DATA START
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My title',
      body: 'My body for note.',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to buy',
      body: 'Table, ram.',
      updatedAt: 0,
      userId: 'testUserId2'
    };
    // TEST DATA END

    // generate seed data for notes
    beforeEach(function() {
      // remove all existing data
      Notes.remove({});

      // insert data
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });


    // test for inserting a note
    it('should insert new note', function() {
      // find note id
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: noteOne.userId });

      expect(Notes.findOne({ _id, userId: noteOne.userId })).toExist();
    });

    // test for not inserting a note if user unauthenticated
    it('should not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });


    // test for not removing a note
    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    // test for not removing a note if user unauthenticated
    it('should not remove note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    // test for not removing a note if note has an invalid note _id
    it('should not remove note if invalid note _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });


    // test for updating a note
    it('should update note', function() {
      const title = 'Updated title!!!';

      Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, { title }]);

      // get note data
      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({ title, body: noteOne.body });
    });

    // test for updating extra note
    it('should throw error if extra updates', function() {
      const data = {
        title: 'New title',
        name: 'Sreejon'
      };

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, data]);
      }).toThrow();
    });

    // test for not updating a note if user was not creator
    it('should not update note if user was not creator', function() {
      const title = 'Updated title!!!';

      Meteor.server.method_handlers['notes.update'].apply({ userId: 'testId' }, [noteOne._id, { title }]);

      // get note data
      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    // test for not updating a note if user unauthenticated
    it('should not update note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    // test for not updating a note if note has an invalid note _id
    it('should not update note if invalid note _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });


    // test for returning a users notes
    it('should return a users notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    // test for returning zero notes for user that has none
    it('should return zero notes for user that has none', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testId' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });
  });
}