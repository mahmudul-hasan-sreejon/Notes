import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from "./users";


if(Meteor.isServer) {
  describe('users', function() {
    it('should allow valid email address', function() {
      // create test data
      const testUser = {
        emails: [
          {
            address: 'test@exmaple.com'
          }
        ]
      };

      const res = validateNewUser(testUser);

      // if validation fails throw an error
      expect(res).toBe(true);
    });

    it('should reject invalid email', function() {
      // create test data
      const testUser = {
        emails: [
          {
            address: 'testexmaplecom'
          }
        ]
      };

      // if validation succeeds throw an error
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}
