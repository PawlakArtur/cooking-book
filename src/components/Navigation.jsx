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
	<ul>
		<li><Link to="/home">Home</Link></li>
		<li><Link to="/productAdd">productAdd</Link></li>
		<li><Link to="/productList">productList</Link></li>
		<li><Link to="/categoryAdd">categoryAdd</Link></li>
		<li><Link to="/recipeAdd">recipeAdd</Link></li>
		<li><Link to="/recipesList">recipesList</Link></li>
		<li><Link to="/account">account</Link></li>
		<li><SignOutButton/></li>
	</ul>;

const NavigationNonAuth = () =>
	<ul>
		<li><Link to="/">Home</Link></li>
		<li><Link to="/signUp">SignUp</Link></li>
		<li><Link to="/signIn">SignIn</Link></li>
	</ul>;

export default Navigation;
