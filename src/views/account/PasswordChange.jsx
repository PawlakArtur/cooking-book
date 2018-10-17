import React, { Component } from 'react';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';

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
		const { translate } = this.props;
		return (
			<div>
				<h1>{translate('views.changePassword')}</h1>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						value={password}
						onChange={this.handleInput}
						placeholder={translate('views.newPassword')}
						name="password"/>
					<input
						type="text"
						value={passwordConfirmation}
						onChange={this.handleInput}
						placeholder={translate('views.confirmNewPassword')}
						name="passwordConfirmation"/>
					<button
						type="submit"
						disabled={isInvalid}>
						{translate('shared.submit')}
					</button>
				</form>
				{ error && <p>{error.message}</p> }
			</div>
		);
	}
}

PasswordChange.propTypes = {
	translate: PropTypes.func.isRequired
};

export default PasswordChange;
