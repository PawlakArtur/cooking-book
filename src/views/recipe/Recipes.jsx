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

		this.removeRecipe = this.removeRecipe.bind(this);
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

	removeRecipe(recipeID) {
		store.removeResource(`recipes/${this.state.currentUserUID}/${recipeID}`);
	}

	render() {
		const { error, recipes } = this.state;
		const { categoryList, translate } = this.props;
		return (
			<section className="section__container">
				<h1 className="section__header">{translate('views.recipeList')}:</h1>
				<div className="section__buttons">
					<Button
						cssClass="button__link--primary"
						to="/recipeAdd"
						linkButton>
						{translate('views.addRecipe')}
					</Button>
				</div>
				<RecipeList recipes={recipes} categoryList={categoryList} removeRecipe={this.removeRecipe} translate={translate}/>
				{ error && <p>{error.message}</p>}
			</section>
		);
	}
}

Recipes.propTypes = {
	categoryList: PropTypes.array.isRequired,
	translate: PropTypes.func.isRequired
};

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(Recipes);
