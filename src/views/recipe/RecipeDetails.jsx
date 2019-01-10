import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, store } from '../../firebase';
import { withAuthorization, Button, RecipeInfo } from '../../components';

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
		store.getResource(`recipes/${currentUserUID}/${recipeID}`)
			.then(snapshot => {
				this.setState({ recipe: snapshot.val() });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { recipe } = this.state;
		const { translate, categoryList, productList } = this.props;
		return (
			<section className="layout__container layout__container--recipeDetails">
				<h1 className="layout__title">{translate('views.recipe')}: {recipe.name}</h1>
				<div className="layout__buttons">
					<Button
						cssClass="button__link--primary"
						to="/recipes"
						linkButton>
						{translate('shared.backToList')}
					</Button>
				</div>
				<RecipeInfo recipe={recipe} categoryList={categoryList} productList={productList} translate={translate}/>
			</section>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(RecipeDetails);

RecipeDetails.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			recipeID: PropTypes.string
		})
	}),
	translate: PropTypes.func.isRequired,
	categoryList: PropTypes.array,
	productList: PropTypes.array
};
