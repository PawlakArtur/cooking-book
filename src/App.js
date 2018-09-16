import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { RecipeAdd, RecipeDetails, RecipesList, SignUp, SignIn } from './views';
import { Navigation, withAuthentication } from './components';

const App = () =>
	<Router>
    	<div>
        	<Navigation/>
			<Route path="/recipeAdd" component={RecipeAdd}/>
			<Route path="/recipeDetails" component={RecipeDetails}/>
			<Route path="/recipesList" component={RecipesList}/>
			<Route path="/signUp" component={SignUp}/>
			<Route path="/signIn" component={SignIn}/>
		</div>
	</Router>

export default withAuthentication(App);
