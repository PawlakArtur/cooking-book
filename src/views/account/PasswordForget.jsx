import React, { Component } from 'react';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';

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
			});

		e.preventDefault();
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { email, error } = this.state;
		const isinvalid = email === '';
		const { translate } = this.props;
		return (
			<div>
				<h1>{translate('views.changePassword')}</h1>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						value={email}
						onChange={this.handleInput}
						placeholder={translate('views.emailAddress')}
						name="email"/>
					<button
						disabled={isinvalid}
						type="submit">
						{translate('shared.submit')}
					</button>
				</form>
				{ error && <p>error.message</p>}
			</div>
		);
	}
}

PasswordForget.propTypes = {
	translate: PropTypes.func.isRequired
};

export default PasswordForget;
