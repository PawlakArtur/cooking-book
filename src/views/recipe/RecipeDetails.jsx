import React, { Component } from 'react';
import { auth, store } from '../../firebase';
import { withAuthorization } from '../../components';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
	recipe: {},
	error: null
};

class RecipeDetails extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount() {
		const currentUserUID = auth.getCurrentUserUID();
		const { match: { params: { recipeID }}} = this.props;
		store.getRecipe(currentUserUID, recipeID)
			.then(snapshot => {
				this.setState({ recipe: snapshot.val() });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { recipe } = this.state;
		return (
			<div>
				<Link to='/recipesList'>Back to list</Link>
				<h1>Recipe name: {recipe && recipe.name}</h1>
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(RecipeDetails);
