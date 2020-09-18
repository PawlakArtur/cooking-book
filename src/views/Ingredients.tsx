import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../services';
import { IingredientOnList } from '../types';

const Ingredients = () => {
	const [ingredients, setIngredients] = useState<IingredientOnList[]>([]);
	useEffect(() => {
		if (firebase.isUserLogged()) {
			firebase.getIngredientsList()
                .then((ingredients) => {
                    setIngredients(ingredients);
                });
		}
    }, [firebase.isUserLogged()]);

	return (
		<React.Fragment>
			<h1>Ingredients</h1>
			{ingredients.length > 0 && (
				<ul>
					{ingredients.map((ingredient) => {
						return (
							<li key={ingredient.id}>
                                {ingredient.name}
							</li>
						)
					})}
				</ul>
			)}
			{ingredients.length === 0 && <div>brak</div>}
		</React.Fragment>
	)
}

export default Ingredients;
