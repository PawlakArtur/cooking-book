import React from 'react';
import RecipeElement from './RecipeElement';
import PropTypes from 'prop-types';

const RecipeList = props =>
	<ul className="recipe__list">
		{props.recipes.map((recipe, index) =>
			<RecipeElement key={`reciple-${index}`} recipe={recipe} categoryList={props.categoryList}/>
		)}
	</ul>;

export default RecipeList;

RecipeList.propTypes = {
	recipes: PropTypes.arrayOf(PropTypes.shape({
		recipeID: PropTypes.string,
		name: PropTypes.string
	})),
	categoryList: PropTypes.array
};
