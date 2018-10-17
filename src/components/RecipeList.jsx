import React from 'react';
import RecipeElement from './RecipeElement';
import PropTypes from 'prop-types';

const RecipeList = ({ categoryList, recipes, removeRecipe, translate }) =>
	<ul className="recipe__list">
		{recipes.map((recipe, index) =>
			<RecipeElement key={`reciple-${index}`} recipe={recipe} categoryList={categoryList} removeRecipe={removeRecipe} translate={translate}/>
		)}
	</ul>;

export default RecipeList;

RecipeList.propTypes = {
	categoryList: PropTypes.array.isRequired,
	recipes: PropTypes.arrayOf(PropTypes.shape({
		recipeID: PropTypes.string,
		name: PropTypes.string
	})).isRequired,
	removeRecipe: PropTypes.func.isRequired,
	translate: PropTypes.func.isRequired
};
