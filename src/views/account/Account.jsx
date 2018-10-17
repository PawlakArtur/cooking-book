import React from 'react';
import PropTypes from 'prop-types';
import PasswordChange from './PasswordChange';
import PasswordForget from './PasswordForget';
import AccountSettings from './AccountSettings';
import { withAuthorization } from '../../components';

const Account = ({ userSettings, translate }) =>
	userSettings && Object.keys(userSettings).length > 0
		? <div>
			<h1>{translate('views.account')}: {userSettings.username}</h1>
			<AccountSettings userSettings={userSettings} translate={translate}/>
			<PasswordForget translate={translate}/>
			<PasswordChange translate={translate}/>
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
