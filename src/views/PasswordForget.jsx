import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const INITIAL_STATE = {
    email: '',
    error: null
};

class PasswordForget extends Component {
    constructor() {
        super();
        this.state = { ...INITIAL_STATE };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onSubmit(e) {
        const { email } = this.state;

        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            })

        e.preventDefault();
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { email, error } = this.state;
        const isinvalid = email === '';

        return (
            <div>
                <h1>Reset password</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        value={email}
                        onChange={this.handleInput}
                        placeholder="Email address"
                        name="email"/>
                    <button
                        disabled={isinvalid}
                        type="submit">
                        Reset my password
                    </button>
                </form>
                { error && <p>error.message</p>}
            </div>
        )
    }
}

export default PasswordForget;
