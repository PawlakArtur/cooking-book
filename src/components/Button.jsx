import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = ({ children, cssClass, to }) =>
	<Link
		className={`button__link ${cssClass}`}
		to={to}
		role="button">
		{children}
	</Link>;

LinkButton.propTypes = {
	children: PropTypes.string,
	cssClass: PropTypes.string,
	to: PropTypes.string
};

const buttonFunction = (actionFunction, type, e) => {
	if (type !== 'submit') {
		e.preventDefault();
	}
	if (actionFunction) {
		actionFunction();
	}
};

const ActionButton = ({ actionFunction, children, cssClass, type }) =>
	<button
		className={`button__button ${cssClass}`}
		onClick={buttonFunction.bind(null, actionFunction, type)}
		type={type}>
		{children}
	</button>;

ActionButton.propTypes = {
	actionFunction: PropTypes.func,
	children: PropTypes.string,
	cssClass: PropTypes.string,
	type: PropTypes.string
};

const Button = props =>
	props.linkButton
		? <LinkButton {...props}/>
		: <ActionButton	{...props}/>;

Button.propTypes = {
	actionFunction: PropTypes.func,
	children: PropTypes.string.isRequired,
	cssClass: PropTypes.string,
	linkButton: PropTypes.bool,
	to: PropTypes.string,
	type: PropTypes.string
};

Button.defaultProps = {
	actionFunction: null,
	cssClass: '',
	linkButton: false,
	to: null,
	type: 'button'
};

export default Button;
