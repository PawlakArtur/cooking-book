import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils';
import stockPhoto from '../stock_photo.jpg';

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
		const { translate, recipe: { executionTime, numberOfEntries, recomended, sourceLink, products, introduction, method, photo }} = this.props;
		const { recipeCategoryName, productsMap, loadingRecipe, loadingCategories, loadingProducts } = this.state;
		const formattedExecutionTime = formatTime(executionTime);
		const loading = loadingRecipe && loadingCategories && loadingProducts;
		const photoPath = photo ? photo : stockPhoto;
		return (
			<>
			{ !loading
			&& (
				<div className="layout__recipeDetails layout__container--no-padding layout__container--background">
					<img src={photoPath} className="recipeDetails__photo" alt="recipe" />
					<div className="recipeDetails__basicInfo">
						<div><span>{translate('views.executionTime')}:</span> <span>{formattedExecutionTime.hours}h {formattedExecutionTime.minutes ? `${formattedExecutionTime.minutes}m` : ''}</span></div>
						<div><span>{translate('views.category')}:</span> <span>{recipeCategoryName}</span></div>
						{recomended ? <div><span>{translate('views.recomended')}</span></div> : null}
					</div>
					<div className="recipeDetails__wrapper">
						<div className="recipeDetails__content">
							<h3 className="recipeDetails__products-title">{translate('views.recipeIntroduction')}</h3>
							<p className="recipeDetails__introduction">{introduction}</p>
							<h3 className="recipeDetails__products-title">{translate('views.recipeMethod')}</h3>
							<p className="recipeDetails__method">{method}</p>
						</div>
						<div className="recipeDetails__products-wrapper">
							<h2 className="recipeDetails__products-title">{translate('views.products')}:</h2>
							<ul className="recipeDetails__products">
								{products && products.map(product =>
									<li key={product} className="recipeDetails__product">{productsMap[product].name}</li>
								)}
							</ul>
						</div>
					</div>
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
		method: PropTypes.string,
		categoryID: PropTypes.string
	}).isRequired,
	translate: PropTypes.func.isRequired,
	categoryList: PropTypes.array.isRequired,
	productList: PropTypes.array.isRequired
};

export default RecipeInfo;
