import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeElement = props =>
	<li className="recipe__element">
		<Link className="recipe__link" to={`/recipeDetails/${props.recipe.recipeID}`}>{props.recipe.name}</Link>
	</li>;

export default RecipeElement;

RecipeElement.propTypes = {
	recipe: PropTypes.shape({
		recipeID: PropTypes.string,
		name: PropTypes.string
	})
};
