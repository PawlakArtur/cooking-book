import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firebase } from '../services';
import { IrecipeDetails } from '../types';

const Recipe = () => {
	const [ recipe, setRecipe ]  = useState<IrecipeDetails>({});
	const { id } = useParams();

	useEffect(() => {
		firebase.getRecipe(id)
			.then((recipe) => {
				if (recipe) {
					setRecipe(recipe);
				}
			});
	}, [id]);
	return (
		<React.Fragment>
			<h1>{recipe.name}</h1>
			<p>{recipe.description}</p>
			<p>{recipe.executionTime}</p>
			<p>{recipe.ingredients}</p>
			<p>{recipe.type}</p>
		</React.Fragment>
	)
}

export default Recipe;
