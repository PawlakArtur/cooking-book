import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils';

const INITIAL_STATE = {
	recipeCategoryName: '',
	productsMap: [],
	loadingRecipe: true,
	loadingCategories: true,
	loadingProducts: true
};

class RecipeInfo extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidUpdate() {
		if (Object.keys(this.props.recipe).length && this.state.loadingRecipe) {
			this.setState({ loadingRecipe: false });
		}
		if (this.props.categoryList.length && this.props.recipe.categoryID && this.state.loadingCategories) {
			const recipeCategory = this.props.categoryList.find(category => category.id === this.props.recipe.categoryID);
			this.setState({ recipeCategoryName: recipeCategory.name, loadingCategories: false });
		}
		if (this.props.productList.length && this.props.recipe.products && this.state.loadingProducts) {
			const filteredProducts = this.props.productList.filter(product => this.props.recipe.products.includes(product.id));
			const productsMap = {};
			filteredProducts.forEach(product => {
				productsMap[product.id] = product;
			});
			this.setState({ productsMap: productsMap, loadingProducts: false });
		}
	}

	render() {
		const { translate, recipe: { executionTime, numberOfEntries, recomended, sourceLink, products, introduction, steps }} = this.props;
		const { recipeCategoryName, productsMap, loadingRecipe, loadingCategories, loadingProducts } = this.state;
		const formattedExecutionTime = formatTime(executionTime);
		const loading = loadingRecipe && loadingCategories && loadingProducts;
		return (
			<>
			{ !loading
			&& (
				<div className="layout__recipeDetails layout__container--background">
					<p><span>{translate('views.executionTime')}:</span> <span>{formattedExecutionTime.hours}h {formattedExecutionTime.minutes ? `${formattedExecutionTime.minutes}m` : ''}</span></p>
					<p><span>{translate('views.category')}:</span> <span>{recipeCategoryName}</span></p>
					<p>{recomended ? <span>{translate('views.recomended')}</span> : null}</p>
					<ul>
						{products && products.map(product =>
							<li key={product}>{productsMap[product].name}</li>
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
			)}
			</>
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
		steps: PropTypes.array,
		categoryID: PropTypes.string
	}).isRequired,
	translate: PropTypes.func.isRequired,
	categoryList: PropTypes.array.isRequired,
	productList: PropTypes.array.isRequired
};

export default RecipeInfo;
