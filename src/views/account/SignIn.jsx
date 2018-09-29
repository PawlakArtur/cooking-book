import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	onSubmit(e) {
		const { email, password } = this.state;
		const { history } = this.props;

		auth.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				history.push('/recipesList');
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
		const { email, password, error } = this.state;
		const isInvalid = email === '' || password === '';
		return (
			<div>
				<h1>SignIn</h1>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={email}
						placeholder="Email address"
						name="email"/>
					<input
						type="password"
						onChange={this.handleInput}
						value={password}
						placeholder="Password"
						name="password"/>
					<button
						type="submit"
						disabled={isInvalid}>
                        Sign in
					</button>
				</form>
				{ error && <p>{error.message}</p> }
			</div>
		);
	}
}

export default withRouter(SignIn);

SignIn.propTypes = {
	history: PropTypes.object
};
