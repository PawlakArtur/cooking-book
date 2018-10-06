import React, { Component } from 'react';
import { auth, store } from '../../firebase';
import { withAuthorization, RecipeList } from '../../components';

const INITIAL_STATE = {
	recipes: [],
	error: null
};

class Recipes extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount() {
		const currentUserUID = auth.getCurrentUserUID();
		store.getResource(`recipes/${currentUserUID}`)
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
		return (
			<section>
				<h1 className="section__header">Recipes list:</h1>
				<RecipeList recipes={recipes}/>
				{ error && <p>{error.message}</p>}
			</section>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(Recipes);
