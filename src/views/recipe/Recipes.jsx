import React, { Component } from 'react';
import { auth, store } from '../../firebase';
import { withAuthorization, RecipeList, Button } from '../../components';
import { extractList } from '../../utils';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
	currentUserUID: null,
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
		self.setState({ currentUserUID });
	}

	componentWillUnmount() {
		store.removeListener(`recipes/${this.state.currentUserUID}`);
	}

	render() {
		const { error, recipes } = this.state;
		const { categoryList } = this.props;
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
				<RecipeList recipes={recipes} categoryList={categoryList}/>
				{ error && <p>{error.message}</p>}
			</section>
		);
	}
}

Recipes.propTypes = {
	categoryList: PropTypes.array
};

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(Recipes);
