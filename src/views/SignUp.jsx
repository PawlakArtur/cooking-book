import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';

const INITIAL_STATE = {
	userName: '',
	email: '',
	password: '',
	passwordConfirmation: '',
	error: null
};

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	onSubmit(e) {
		const { email, password, userName } = this.state;
		const { history } = this.props;

		auth.doCreateUserWithEmailAndPassword(email, password)
			.then(authUser => {
				db.doCreateUser(authUser.user.uid, userName, email)
					.then(() => {
						this.setState({ ...INITIAL_STATE });
						history.push('/');
					})
					.catch(error => {
						this.setState({ error: error });
					});
			})
			.catch(error => {
				this.setState({ error: error });
			});

		e.preventDefault();
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { userName, email, password, passwordConfirmation, error } = this.state;
		const isInvalid = password !== passwordConfirmation
            || password === ''
            || email === ''
            || userName === '';
		return (
			<div>
				<h1>Signup</h1>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={userName}
						placeholder="User name"
						name="userName"/>
					<input
						type="text"
						onChange={this.handleInput}
						value={email}
						placeholder="Address email"
						name="email"/>
					<input
						type="password"
						onChange={this.handleInput}
						value={password}
						placeholder="Password"
						name="password"/>
					<input
						type="password"
						onChange={this.handleInput}
						value={passwordConfirmation}
						placeholder="Confirm password"
						name="passwordConfirmation"/>
					<button
						type="submit"
						disabled={isInvalid}>
                        Sign up
					</button>
				</form>
				{ error && <p>{error.message}</p>}
			</div>
		);
	}
}

export default withRouter(SignUp);
