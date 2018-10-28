import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { Button } from '../../components';

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
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">Signup</h1>
				<form className="layout__main layout__container layout__container--form form__container" onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={userName}
						placeholder="User name"
						name="userName"
						className="form__input"/>
					<input
						type="text"
						onChange={this.handleInput}
						value={email}
						placeholder="Address email"
						name="email"
						className="form__input"/>
					<input
						type="password"
						onChange={this.handleInput}
						value={password}
						placeholder="Password"
						name="password"
						className="form__input"/>
					<input
						type="password"
						onChange={this.handleInput}
						value={passwordConfirmation}
						placeholder="Confirm password"
						name="passwordConfirmation"
						className="form__input"/>
					<Button
						type="submit"
						cssClass="layout__button"
						disabled={isInvalid}>
                        Sign up
					</Button>
				</form>
				{ error && <p>{error.message}</p>}
			</div>
		);
	}
}

export default withRouter(SignUp);

SignUp.propTypes = {
	history: PropTypes.object
};
