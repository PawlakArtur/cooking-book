import React from 'react';
import { auth } from '../firebase';
import PropTypes from 'prop-types';
import Button from './Button';

const SignOutButton = ({ translate }) =>
	<Button
		actionFunction={auth.doSignOut}
		cssClass="button__button--transparent">
		{translate('components.signOut')}
	</Button>;

SignOutButton.propTypes = {
	translate: PropTypes.func.isRequired
};

export default SignOutButton;
