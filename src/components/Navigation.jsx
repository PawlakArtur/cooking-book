import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import AuthUserContext from './AuthUserContext';

const Navigation = () =>
	<AuthUserContext.Consumer>
		{ authUser =>
			<nav>
				{ authUser
					? <NavigationAuth/>
					: <NavigationNonAuth/> }
			</nav>
		}
	</AuthUserContext.Consumer>;

const NavigationAuth = () =>
	<ul className="navigation__list">
		<li className="navigation__element"><Link className="navigation__link" to="/home">Home</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/productAdd">productAdd</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/productList">productList</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/categoryAdd">categoryAdd</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/categoryList">categoryList</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/recipeAdd">recipeAdd</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/recipes">recipes</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/account">account</Link></li>
		<li className="navigation__element"><SignOutButton/></li>
	</ul>;

const NavigationNonAuth = () =>
	<ul className="navigation__list">
		<li className="navigation__element"><Link className="navigation__link" to="/">Home</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/signUp">SignUp</Link></li>
		<li className="navigation__element"><Link className="navigation__link" to="/signIn">SignIn</Link></li>
	</ul>;

export default Navigation;
