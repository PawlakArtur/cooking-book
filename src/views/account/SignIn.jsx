import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../../firebase';
import { Button, withRouterWrapper } from '../../components';

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
				history.push('/recipes');
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
		const { translate } = this.props;
		const isInvalid = email === '' || password === '';
		return (
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.signIn')}</h1>
				<form className="layout__main layout__container layout__container--form form__container" onSubmit={this.onSubmit}>
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
					<Button
						type="submit"
						cssClass="layout__button"
						disabled={isInvalid}>
						{translate('views.signIn')}
					</Button>
				</form>
				{ error && <p>{error.message}</p> }
			</div>
		);
	}
}

export default withRouterWrapper(SignIn);

SignIn.propTypes = {
	history: PropTypes.object.isRequired,
	translate: PropTypes.func.isRequired
};
