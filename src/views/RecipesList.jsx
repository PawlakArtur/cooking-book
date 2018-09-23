import React, { Component } from 'react';
import { auth, store } from '../firebase';
import { withAuthorization } from '../components';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
	recipes: [],
	error: null
};

class RecipesList extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount() {
		const currentUserUID = auth.getCurrentUserUID();
		store.getRecipes(currentUserUID)
			.then(snapshot => {
				const recipes = [];
				Object.keys(snapshot.val()).forEach(recipeID => {
					const recipe = Object.assign(snapshot.val()[recipeID], { recipeID: recipeID });
					recipes.push(recipe);
				});
				this.setState({ recipes });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { error, recipes } = this.state;
		console.log(recipes);
		return (
			<div>
				<h1>Recipes list:</h1>
				<ul>
					{recipes.map((recipe, index) =>
						<li key={index}>
							<Link to={`/recipeDetails/${recipe.recipeID}`}>{recipe.name}</Link>
						</li>
					)}
				</ul>
				{ error && <p>{error.message}</p>}
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(RecipesList);
