import React from 'react';
import PropTypes from 'prop-types';
import PasswordChange from './PasswordChange';
import PasswordForget from './PasswordForget';
import AccountSettings from './AccountSettings';
import { withAuthorization } from '../../components';

const Account = ({ userSettings, translate }) =>
	userSettings && Object.keys(userSettings).length > 0
		? <div>
			<h1>Account: {userSettings.username}</h1>
			<AccountSettings userSettings={userSettings} translate={translate}/>
			<PasswordForget/>
			<PasswordChange/>
		</div>
		: null;

Account.propTypes = {
	userSettings: PropTypes.shape({
		email: PropTypes.string,
		username: PropTypes.string,
		language: PropTypes.string
	}),
	translate: PropTypes.func
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Account);
