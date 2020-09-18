import React, { useState, SyntheticEvent, FormEvent } from 'react';
import { firebase } from '../services';
import { IingredientDetails, IingredientUnit } from '../types';

const AddIngredient = () => {
	const [name, setName ] = useState('');
	const [unit, setUnit ] = useState<IingredientUnit | undefined>(IingredientUnit.kg);

	const handleAddRecipe = (event: SyntheticEvent) => {
		event.preventDefault();
		const ingredient: IingredientDetails = {
			name: name,
			unit: unit,
		};
		console.log(ingredient);
		firebase.setIngredient(ingredient);
	}
	const handleOnNameChange = (event: FormEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	}
	const handleOnUnitChange = (event: FormEvent<HTMLSelectElement>) => {
		setUnit(event.currentTarget.value as IingredientUnit);
	}

	return (
		<React.Fragment>
            <h1>Add ingredient</h1>
			<form className="form" onSubmit={handleAddRecipe}>
				<label className="form__label" htmlFor="name">name</label>
				<input className="form__input" type="string" id="name" value={name} onChange={handleOnNameChange} />
				<label className="form__label" htmlFor="unit">unit</label>
				<select className="form__input" id="unit" value={unit} onChange={handleOnUnitChange}>
					<option value={IingredientUnit.kg}>kg</option>
					<option value={IingredientUnit.l}>l</option>
					<option value={IingredientUnit.pc}>pc</option>
					<option value={IingredientUnit.pinch}>pinch</option>
					<option value={IingredientUnit.glass}>glass</option>
				</select>
				<button className="form__button" type="submit">Add ingredient</button>
			</form>
		</React.Fragment>
	)
}

export default AddIngredient;
