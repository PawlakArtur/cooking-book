import React from 'react';
import { auth } from '../firebase';
import PropTypes from 'prop-types';

const SignOutButton = ({ translate }) =>
	<button
		type="button"
		onClick={auth.doSignOut}>
		{translate('components.signOut')}
	</button>;

SignOutButton.propTypes = {
	translate: PropTypes.func.isRequired
};

export default SignOutButton;
