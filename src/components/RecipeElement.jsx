import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

const RecipeElement = props =>
	<DataContext.Consumer>
		{ ({ categoryList }) => {
			const cateogryName = categoryList.find(cateogry => cateogry.id === props.recipe.categoryID).name;
			return <li className="recipe__element">
				<Link className="recipe__link" to={`/recipeDetails/${props.recipe.recipeID}`}>
					<p>{props.recipe.name}</p>
					<p>Execution time: {props.recipe.executionTime}</p>
					<p>Category: {cateogryName}
					</p>
				</Link>
			</li>;
		}}
	</DataContext.Consumer>;

export default RecipeElement;

RecipeElement.propTypes = {
	recipe: PropTypes.shape({
		recipeID: PropTypes.string,
		name: PropTypes.string,
		executionTime: PropTypes.string,
		categoryID: PropTypes.string
	})
};
