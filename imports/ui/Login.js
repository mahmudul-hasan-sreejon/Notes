import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


export default class Login extends React.Component {
  constructor(props) {
    // import props from react component class
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    // prevent browser page refresh
    e.preventDefault();

    // trim reference values
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    // login into user account
    Meteor.loginWithPassword({ email }, password, err => {
      const error = err ? 'Unable to login. Please, check your email and password.' : '';
      this.setState({ error });
    });
  }

  showError(error) {
    Alert.error(error, {
      position: 'bottom',
      effect: 'stackslide',
      preserveContext: true,
      timeout: 7000
    });
  }

  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Login</h1>

          {this.state.error ? this.showError(this.state.error) : undefined}
          <Alert stack={{ limit: 1 }} />

          <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />

            <button className='button'>Login</button>
          </form>

          <Link to='/signup'>Haven't registered yet?</Link>
        </div>
      </div>
    );
  }
}
