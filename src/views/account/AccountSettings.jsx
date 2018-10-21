import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { store } from '../../firebase';

const INITIAL_STATE = {
	languages: [ 'pl', 'en' ]
};

class AccountSettings extends Component {
	constructor(props) {
		super();
		this.state = { ...INITIAL_STATE, userSettings: props.userSettings };

		this.handleInput = this.handleInput.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleInput(e) {
		const newUserSettings = {
			[e.target.name]: e.target.value
		};
		this.setState(prevState => ({
			userSettings: {
				...prevState.userSettings,
				...newUserSettings
			},
			prevUserSettings: prevState.userSettings
		}));
	}

	onSubmit(e) {
		const { userSettings, prevUserSettings } = this.state;
		store.updateResource(`users/${userSettings.uid}`, userSettings)
			.catch(error => {
				this.setState({ error, userSettings: prevUserSettings });
			});
		e.preventDefault();
	}

	render() {
		const { languages, userSettings: { language }} = this.state;
		const { translate } = this.props;
		return (
			<section>
				<h2>{translate('views.userSettings')}:</h2>
				<form onSubmit={this.onSubmit}>
					<select
						onChange={this.handleInput}
						value={language}
						placeholder={translate('views.userLanguage')}
						name="language">
						<option>--{translate('views.chooseLanguage')}--</option>
						{ languages.map((optionLanguage, index) =>
							<option key={`language_${index}`} value={optionLanguage}>{optionLanguage}</option>
						)}
					</select>
					<button
						type="submit">
						{translate('shared.submit')}
					</button>
				</form>
			</section>
		);
	}
}

AccountSettings.propTypes = {
	userSettings: PropTypes.shape({
		email: PropTypes.string,
		username: PropTypes.string,
		language: PropTypes.string
	}),
	translate: PropTypes.func
};

export default AccountSettings;