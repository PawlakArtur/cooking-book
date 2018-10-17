import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import AuthUserContext from './AuthUserContext';
import MethodsContext from './MethodsContext';
import PropTypes from 'prop-types';

const Navigation = () =>
	<AuthUserContext.Consumer>
		{ authUser =>
			<MethodsContext.Consumer>
				{ ({ translate }) =>
					<nav>
						{ authUser
							? <NavigationAuth translate={translate}/>
							: <NavigationNonAuth translate={translate}/> }
					</nav>
				}
			</MethodsContext.Consumer>
		}
	</AuthUserContext.Consumer>;

const NavigationAuth = ({ translate }) =>
	<ul className="navigation__list">
		<li className="navigation__element"><Link className="navigation__link" to="/home">{translate('menu.home')}</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/productList">{translate('menu.productList')}</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/categoryList">{translate('menu.categoryList')}</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/recipes">{translate('menu.recipeList')}</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/account">{translate('menu.account')}</Link></li>
		<li className="navigation__element"><SignOutButton translate={translate}/></li>
	</ul>;

NavigationAuth.propTypes = {
	translate: PropTypes.func.isRequired
};

const NavigationNonAuth = ({ translate }) =>
	<ul className="navigation__list">
		<li className="navigation__element"><Link className="navigation__link" to="/">{translate('menu.home')}</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/signUp">{translate('menu.signUp')}</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/signIn">{translate('menu.signIn')}</Link></li>
	</ul>;

NavigationNonAuth.propTypes = {
	translate: PropTypes.func.isRequired
};

export default Navigation;
