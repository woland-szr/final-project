import React, { Component } from 'react';
import { AdminHeader } from './AdminHeader';

export class Admin extends Component {
    state = {
        email: '',
        password: '',
        auth: '',
        userData: ''
    }
    
    handleEmailEnter = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    handlePwdEnter = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }

    handleUserAuth = () => {
        const user = this.state;
        fetch('http://84.201.129.203:8888/api/auth/sign_in', { 
            method: 'POST', 
            body: JSON.stringify({ 
                "email": user.email,
                "password": user.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => 
            { 
                if (response.ok) {
                    response.json()
                    .then(userData => {
                        localStorage.setItem('firstName', userData.firstName);
                        localStorage.setItem('lastName', userData.lastName);
                        localStorage.setItem('token', userData.token);
                        this.setState({ auth: true, userData: userData }) 
                    })
                } else {
                    this.setState({ auth: false, email: '', password: '' }) 
                }
        });
    }

    render() {
    if (!localStorage.getItem('token')) {
        const user = this.state; 
        let errorMsg = '';
        if (!user.auth) {
            if (user.auth === false) { errorMsg = "Вы ввели неверный логин или пароль. Попробуйте еще раз." }
            return (
                <div>
                    {errorMsg}
                    <form>
                        <input type="text" name="email" placeholder="Ваш e-mail" onChange={this.handleEmailEnter} value={user.email} /> <br />
                        <input type="password" name="password" placeholder="Ваш пароль" onChange={this.handlePwdEnter} value={user.password} /> <br />
                        <input type="button" onClick={this.handleUserAuth} value="LOGIN" disabled={!user.email.length || !user.password.length} />
                    </form>
                </div>
            )}
        } else {
            return (
                <div>
                    <div><AdminHeader /></div>
                    <div><h3> Welcome to admin panel </h3></div>
                </div>
            )
        }
    }
}