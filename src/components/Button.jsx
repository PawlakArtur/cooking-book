import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = ({ children, cssClass, to }) =>
	<Link
		className={`button__link ${cssClass}`}
		to={to}>
		{children}
	</Link>;

LinkButton.propTypes = {
	children: PropTypes.string,
	cssClass: PropTypes.string,
	to: PropTypes.string
};

const buttonFunction = (actionFunction, e) => {
	e.preventDefault();
	actionFunction();
};

const ActionButton = ({ actionFunction, children, cssClass }) =>
	<button
		className={`button__button ${cssClass}`}
		onClick={buttonFunction.bind(null, actionFunction)}>
		{children}
	</button>;

ActionButton.propTypes = {
	actionFunction: PropTypes.func,
	children: PropTypes.string,
	cssClass: PropTypes.string
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
	to: PropTypes.string
};

export default Button;
