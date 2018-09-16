import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';

const Navigation = (() => 
    <nav>
        <ul>
            <li><Link to="/recipeAdd">recipeAdd</Link></li>
            <li><Link to="/recipeDetails">recipeDetails</Link></li>
            <li><Link to="/recipesList">recipesList</Link></li>
            <li><Link to="/signUp">SignUp</Link></li>
            <li><Link to="/signIn">SignIn</Link></li>
            <li><SignOutButton/></li>
        </ul>
    </nav>
);

export default Navigation;
