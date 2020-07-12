import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IRecipe } from './Recipes';
import { firebase } from '../services';

const Recipe = () => {
	let { id } = useParams();
	const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);
	useEffect(() => {
		var docRef = firebase.db.collection("recipes").doc(id);
		docRef.get().then(function(doc: any) {
			const recipeData: IRecipe = {
				id: doc.id,
				name: doc.data().name,
				type: doc.data().type,
			}
			setRecipe(recipeData);
		});
	}, [id]);
	return (
		<React.Fragment>
			{recipe &&
				<React.Fragment>
					<div>{recipe.name}</div>
					<div>{recipe.type}</div>
				</React.Fragment>
			}
			{!recipe && 'Loading'}
		</React.Fragment>
	)
}

export default Recipe;
