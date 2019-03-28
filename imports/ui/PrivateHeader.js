import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';


const PrivateHeader = (props) => {
  const title = props.title;

  const onLogout = () => {
    // logout user
    Accounts.logout();
  };

  return (
    <div className='header'>
      <div className='header__content'>
        <h1 className='header__title'>{title}</h1>

        <button onClick={onLogout} className='button button--link-text'>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;
