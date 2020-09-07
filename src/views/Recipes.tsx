import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../services';
import { IrecipeOnList } from '../types';

const Recipes = () => {
	const [recipes, setRecipes] = useState<IrecipeOnList[]>([]);
	useEffect(() => {
		if (firebase.isUserLogged()) {
			firebase.getRecipesList()
			.then((recipes) => {
				setRecipes(recipes);
			});
		}
	}, [firebase.isUserLogged()]);

	return (
		<React.Fragment>
			{recipes.length > 0 && (
				<ul>
					{recipes.map((recipe) => {
						return (
							<li key={recipe.id}>
								<Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
							</li>
						)
					})}
				</ul>
			)}
			{recipes.length === 0 && <div>brak</div>}
		</React.Fragment>
	)
}

export default Recipes;
