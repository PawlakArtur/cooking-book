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
		<li className="list__element"><Link className="element__link" to="/home">Home</Link></li>
		<li className="list__element"><Link className="element__link" to="/productAdd">productAdd</Link></li>
		<li className="list__element"><Link className="element__link" to="/productList">productList</Link></li>
		<li className="list__element"><Link className="element__link" to="/categoryAdd">categoryAdd</Link></li>
		<li className="list__element"><Link className="element__link" to="/categoryList">categoryList</Link></li>
		<li className="list__element"><Link className="element__link" to="/recipeAdd">recipeAdd</Link></li>
		<li className="list__element"><Link className="element__link" to="/recipesList">recipesList</Link></li>
		<li className="list__element"><Link className="element__link" to="/account">account</Link></li>
		<li className="list__element"><SignOutButton/></li>
	</ul>;

const NavigationNonAuth = () =>
	<ul>
		<li><Link to="/">Home</Link></li>
		<li><Link to="/signUp">SignUp</Link></li>
		<li><Link to="/signIn">SignIn</Link></li>
	</ul>;

export default Navigation;
