import React, { Component } from 'react';
import { auth } from '../../firebase';

const INITIAL_STATE = {
	password: '',
	passwordConfirmation: '',
	error: null
};

class PasswordChange extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	onSubmit(e) {
		const { password } = this.state;

		auth.doPasswordUpdate(password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch(error => {
				this.setState({ error });
			});

		e.preventDefault();
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { password, passwordConfirmation, error } = this.state;
		const isInvalid = password !== passwordConfirmation || password === '';

		return (
			<div>
				<h1>Change password</h1>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						value={password}
						onChange={this.handleInput}
						placeholder="New password"
						name="password"/>
					<input
						type="text"
						value={passwordConfirmation}
						onChange={this.handleInput}
						placeholder="Confirm new password"
						name="passwordConfirmation"/>
					<button
						type="submit"
						disabled={isInvalid}>
                        Reset my password
					</button>
				</form>
				{ error && <p>{error.message}</p> }
			</div>
		);
	}
}

export default PasswordChange;
