import React, { useState, useEffect } from 'react';
import { firebase } from '../services';
import { IrecipeOnList } from '../types';

const Recipes = () => {
	const [recipes, setRecipes] = useState<IrecipeOnList[]>([]);
	useEffect(() => {
		firebase.getRecipesList()
			.then((recipes) => {
				setRecipes(recipes);
			});
	}, []);
	return (
		<ul>
			{recipes.map((recipe) => {
				return <li key={recipe.id}>{recipe.name}</li>
			})}
		</ul>
	)
}

export default Recipes;
