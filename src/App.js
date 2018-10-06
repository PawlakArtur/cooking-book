import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { RecipeAdd, RecipeDetails, Recipes, SignUp, SignIn, PasswordForget, Account, Home, ProductAdd, ProductList, CategoryAdd, CategoryList } from './views';
import { Navigation, extendedProvider } from './components';

const App = () =>
	<Router>
		<React.Fragment>
			<Navigation/>
			<Route path="/recipeAdd" component={RecipeAdd}/>
			<Route path="/recipeDetails/:recipeID" component={RecipeDetails}/>
			<Route path="/recipes" component={Recipes}/>
			<Route path="/signUp" component={SignUp}/>
			<Route path="/signIn" component={SignIn}/>
			<Route path="/resetPassword" component={PasswordForget}/>
			<Route path="/account" component={Account}/>
			<Route path="/home" component={Home}/>
			<Route path="/productAdd" component={ProductAdd}></Route>
			<Route path="/productList" component={ProductList}></Route>
			<Route path="/categoryAdd" component={CategoryAdd}></Route>
			<Route path="/categoryList" component={CategoryList}></Route>
		</React.Fragment>
	</Router>;

export default extendedProvider(App);
