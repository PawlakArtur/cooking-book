import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../../firebase';
import { Button } from '../../components';

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
			<section className="layout__container layout__container--wide layout__item--wide">
				<h2 className="layout__title">{translate('views.changePassword')}</h2>
				<form onSubmit={this.onSubmit} className="layout__main layout__container layout__container--form form__container">
					<input
						type="text"
						value={password}
						onChange={this.handleInput}
						placeholder={translate('views.newPassword')}
						name="password"
						className="form__input"/>
					<input
						type="text"
						value={passwordConfirmation}
						onChange={this.handleInput}
						placeholder={translate('views.confirmNewPassword')}
						name="passwordConfirmation"
						className="form__input"/>
					<Button
						type="submit"
						cssClass="layout__button"
						disabled={isInvalid}>
						{translate('shared.submit')}
					</Button>
				</form>
				{ error && <p>{error.message}</p> }
			</section>
		);
	}
}

PasswordChange.propTypes = {
	translate: PropTypes.func.isRequired
};

export default PasswordChange;
