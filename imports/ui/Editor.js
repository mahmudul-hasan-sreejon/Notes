import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';


export class Editor extends React.Component {
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }

  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }

  render() {
    if(this.props.note) { // if there is a note
      return (
        <div>
          <input value={ this.props.note.title } placeholder='Untitled Note' onChange={ this.handleTitleChange.bind(this) } />

          <textarea value={ this.props.note.body } placeholder='Your note here' onChange={ this.handleBodyChange.bind(this) }></textarea>

          <button>Delete Note</button>
        </div>
      );
    }
    else { // if there is an invalid id or nothing
      return (
        <p>{ this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.' }</p>
      );
    }
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);