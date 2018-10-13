import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

const RecipeElement = ({ recipe }) =>
	<DataContext.Consumer>
		{ ({ categoryList }) => {
			const cateogryName = categoryList.find(cateogry => cateogry.id === recipe.categoryID).name;
			return <li className="recipe__element">
				<div className="recipe__image"></div>
				<div className="recipe__information">
					<h2 className="recipe__title"><Link className="recipe__link" to={`/recipeDetails/${recipe.id}`}>{recipe.name}</Link></h2>
					<p className="recipe__executionTime">Execution time: {recipe.executionTime}</p>
					<p className="recipe__category">Category: {cateogryName}</p>
				</div>
				<div className="recipe__buttons"></div>
			</li>;
		}}
	</DataContext.Consumer>;

export default RecipeElement;

RecipeElement.propTypes = {
	recipe: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		executionTime: PropTypes.string,
		categoryID: PropTypes.string
	})
};
