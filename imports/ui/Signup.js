import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


export default class Signup extends React.Component {
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

    // password validation
    if(password.length < 9) {
      return this.setState({ error: "Password must be more than 8 characters long" });
    }

    // create account user
    Accounts.createUser({ email, password }, err => {
      const error = err ? err.reason : '';
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
          <h1>Register</h1>

          {this.state.error ? this.showError(this.state.error) : undefined}
          <Alert stack={{ limit: 1 }} />

          <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />

            <button className='button'>Create Account</button>
          </form>

          <Link to='/'>Already have an account?</Link>
        </div>
      </div>
    );
  }
}
