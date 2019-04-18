import { Meteor } from 'meteor/meteor';
import React from 'react';

import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';


if(Meteor.isClient) {
  describe('NoteListItem', function() {
    it('should render title and timestamp', function() {
      const title = 'My title here';
      const updatedAt = 1555589448588;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('18/04/2019');
    });

    it('should set default title if no title set', function() {
      const title = '';
      const updatedAt = 1555589448588;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  });
}
