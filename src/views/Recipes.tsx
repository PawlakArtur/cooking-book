import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../services';

export interface IRecipe {
	id: string,
	name: string,
	type: string,
  }

const Recipes = () => {	  
	const [recipes, setRecipes] = useState<IRecipe[]>([]);
	useEffect(() => {
	  firebase.db.collection('recipes').get().then((querySnapshot) => {
		const recipesArray: IRecipe[] = querySnapshot.docs.map(doc => {
		  return {
			id: doc.id,
			name: doc.data().name,
			type: doc.data().type,
		  }
		});
		setRecipes(recipesArray);
	  });
	}, []);
	return (
		<div>
			{recipes.map((recipe: IRecipe) => {
				return (
					<div key={`${recipe.id}`}>
						<Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
					</div>
				)
			})}
		</div>
	);
}

export default Recipes;
