import React, { Component } from 'react';
import { AdminHeader } from './AdminHeader';
import './Admin.css';

export class Admin extends Component {
  state = {
    email: '',
    password: '',
    auth: '',
  };

  handleEmailEnter = (event) => {
    const email = event.target.value;
    this.setState({ email });
  };

  handlePwdEnter = (event) => {
    const password = event.target.value;
    this.setState({ password });
  };

  handleUserAuth = async () => {
    const user = this.state;
    const response = await fetch('http://84.201.129.203:8888/api/auth/sign_in', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      response.json().then((userData) => {
        localStorage.setItem('firstName', userData.firstName);
        localStorage.setItem('lastName', userData.lastName);
        localStorage.setItem('token', userData.token);
        this.setState({ auth: true });
      });
    } else {
      this.setState({ auth: false, email: '', password: '' });
    }
  };

  render() {
    if (!localStorage.getItem('token')) {
      const user = this.state;
      let errorMsg = '';
      if (!user.auth) {
        if (user.auth === false) {
          errorMsg = 'You entered wrong email or password. Try again please.';
        }
        return (
          <div className="form_container form_container__admin">
            <div className="form_block">
              <div className="errorMsg">{errorMsg}</div>
              <label className="form_label" htmlFor="email">
                {' '}
                E-mail
                <input
                  className="form_input form_input_email"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your e-mail"
                  onChange={this.handleEmailEnter}
                  size="30"
                  value={user.email}
                />
              </label>
              <label className="form_label" htmlFor="password">
                {' '}
                Password
                <input
                  className="form_input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={this.handlePwdEnter}
                  size="30"
                  value={user.password}
                />
              </label>
            </div>
            <input
              className="myButton login_btn"
              type="button"
              onClick={this.handleUserAuth}
              value="Login"
              disabled={!user.email.length || !user.password.length}
            />
          </div>
        );
      }
    } else {
      return (
        <div>
          <div>
            <AdminHeader />
          </div>
        </div>
      );
    }
    return null;
  }
}
