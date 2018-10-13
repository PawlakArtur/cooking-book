import React, { Component } from 'react';
import { auth, store } from '../../firebase';
import { withAuthorization, RecipeList, Button } from '../../components';
import { extractList } from '../../utils';

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
		const self = this;
		const currentUserUID = auth.getCurrentUserUID();
		store.listenForResource(`recipes/${currentUserUID}`, function getRecipes(snapshot) {
			const recipes = extractList(snapshot);
			self.setState({ recipes });
		});
	}

	render() {
		const { error, recipes } = this.state;
		return (
			<section className="section__container">
				<h1 className="section__header">Recipes list:</h1>
				<div className="section__buttons">
					<Button
						cssClass="button__link--primary"
						to="/recipeAdd"
						linkButton>
						Add recipe
					</Button>
				</div>
				<RecipeList recipes={recipes}/>
				{ error && <p>{error.message}</p>}
			</section>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(Recipes);
