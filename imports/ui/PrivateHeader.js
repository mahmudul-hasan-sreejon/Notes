import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


export const PrivateHeader = props => {
  const navImageSrc = props.isNavOpen ? '/client/images/x.svg' : '/client/images/bars.svg';

  return (
    <div className='header'>
      <div className='header__content'>
        <img className='header__nav-toggle' src={navImageSrc} onClick={props.handleNavToggle} />

        <h1 className='header__title'>{props.title}</h1>

        <button onClick={props.handleLogout} className='button button--link-text'>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleNavToggle: PropTypes.func.isRequired,
  inNavOpen: PropTypes.bool.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader);