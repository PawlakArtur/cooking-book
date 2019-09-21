import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from '../../firebase';
import { Button, withRouterWrapper } from '../../components';
import { constants } from '../../config';

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
		const { defaultLanguage, defaultUserRole } = constants;

		auth.doCreateUserWithEmailAndPassword(email, password)
			.then(authUser => {
				const createUserParameters = {
					id: authUser.user.uid,
					username: userName,
					email,
					language: defaultLanguage,
					role: defaultUserRole
				};
				db.doCreateUser(createUserParameters)
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
		const { translate } = this.props;
		const isInvalid = password !== passwordConfirmation
            || password === ''
            || email === ''
            || userName === '';
		return (
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.signUp')}</h1>
				<form className="layout__main layout__container layout__container--form form__container" onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={userName}
						placeholder={translate('views.userName')}
						name="userName"
						className="form__input"/>
					<input
						type="text"
						onChange={this.handleInput}
						value={email}
						placeholder={translate('views.emailAddress')}
						name="email"
						className="form__input"/>
					<input
						type="password"
						onChange={this.handleInput}
						value={password}
						placeholder={translate('views.password')}
						name="password"
						className="form__input"/>
					<input
						type="password"
						onChange={this.handleInput}
						value={passwordConfirmation}
						placeholder={translate('views.confirmPassword')}
						name="passwordConfirmation"
						className="form__input"/>
					<Button
						type="submit"
						cssClass="layout__button"
						disabled={isInvalid}>
						{translate('views.signUp')}
					</Button>
				</form>
				{ error && <p>{error.message}</p>}
			</div>
		);
	}
}

export default withRouterWrapper(SignUp);

SignUp.propTypes = {
	history: PropTypes.object.isRequired,
	translate: PropTypes.func.isRequired
};
