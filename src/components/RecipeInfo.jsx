import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
	recipeCategoryName: ''
};

class RecipeInfo extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidUpdate() {
		if (this.props.categoryList.length && this.props.recipe.categoryID && !this.state.recipeCategoryName) {
			const recipeCategory = this.props.categoryList.find(category => category.id === this.props.recipe.categoryID);
			this.setState({ recipeCategoryName: recipeCategory.name });
		}
	}

	render() {
		const { translate, recipe: { executionTime, numberOfEntries, recomended, sourceLink, products, introduction, steps }} = this.props;
		const { recipeCategoryName } = this.state;
		return (
			<div className="layout__recipeDetails">
				<p><span>{translate('views.executionTime')}:</span> <span>{executionTime}</span></p>
				<p><span>{translate('views.category')}:</span> <span>{recipeCategoryName}</span></p>
				<p>{recomended ? <span>{translate('views.recomended')}</span> : null}</p>
				<ul>
					{products && products.map((product, index) =>
						<li key={`product-${index}`}>{product}</li>
					)}
				</ul>
				<p>{introduction}</p>
				<ul>
					{steps && steps.map((step, index) =>
						<li key={`step-${index}`}>{step}</li>
					)}
				</ul>
				<p><span>{translate('views.numberOfEntries')}:</span> <span>{numberOfEntries}</span></p>
				<p><span>{translate('views.recipeSourceLink')}:</span> <span>{sourceLink}</span></p>
			</div>
		);
	}
}

RecipeInfo.propTypes = {
	recipe: PropTypes.shape({
		executionTime: PropTypes.string,
		numberOfEntries: PropTypes.number,
		recomended: PropTypes.bool,
		sourceLink: PropTypes.string,
		products: PropTypes.array,
		introduction: PropTypes.string,
		steps: PropTypes.array
	}).isRequired,
	translate: PropTypes.func.isRequired,
	categoryList: PropTypes.array.isRequired
};

export default RecipeInfo;
