import React, { useState, SyntheticEvent, FormEvent } from 'react';
import { firebase } from '../services';
import { IrecipeDetails, IrecipeType } from '../types';

const AddRecipe = () => {
	const [name, setName ] = useState('');
	const [type, setType ] = useState<IrecipeType | undefined>(IrecipeType.breakfast);
	const [ingredients, setIngredients ] = useState('');
	const [description, setDescription ] = useState('');
	const [executionTime, setExecutionTime ] = useState(0);

	const handleAddRecipe = (event: SyntheticEvent) => {
		event.preventDefault();
		const recipe: IrecipeDetails = {
			name: name,
			type: type,
			ingredients: ingredients,
			description: description,
			executionTime: executionTime,
		};
		firebase.setRecipe(recipe);
	}
	const handleOnNameChange = (event: FormEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	}
	const handleOnTypeChange = (event: FormEvent<HTMLSelectElement>) => {
		setType(event.currentTarget.value as IrecipeType);
	}
	const handleOnIngredientsChange = (event: FormEvent<HTMLInputElement>) => {
		setIngredients(event.currentTarget.value);
	}
	const handleOnDescriptionChange = (event: FormEvent<HTMLInputElement>) => {
		setDescription(event.currentTarget.value);
	}
	const handleOnExecutionTimeChange = (event: FormEvent<HTMLInputElement>) => {
		setExecutionTime(Number(event.currentTarget.value));
	}

	return (
		<React.Fragment>
            <h1>Add recipe</h1>
			<form onSubmit={handleAddRecipe}>
				<label htmlFor="name">name</label>
				<input type="string" id="name" value={name} onChange={handleOnNameChange} />
				<label htmlFor="type">type</label>
				<select id="type" value={type} onChange={handleOnTypeChange}>
					<option value={IrecipeType.breakfast}>breakfast</option>
					<option value={IrecipeType.dinner}>dinner</option>
					<option value={IrecipeType.lunch}>lunch</option>
					<option value={IrecipeType.snack}>snack</option>
					<option value={IrecipeType.supper}>supper</option>
				</select>
				<label htmlFor="ingredients">ingredients</label>
				<input type="string" id="ingredients" value={ingredients} onChange={handleOnIngredientsChange} />
				<label htmlFor="description">description</label>
				<input type="string" id="description" value={description} onChange={handleOnDescriptionChange} />
				<label htmlFor="executionTime">executionTime</label>
				<input type="number" id="executionTime" value={executionTime} onChange={handleOnExecutionTimeChange} />
				<button type="submit">Add recipe</button>
			</form>
		</React.Fragment>
	)
}

export default AddRecipe;
