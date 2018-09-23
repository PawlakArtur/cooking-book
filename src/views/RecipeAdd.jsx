import React, { Component } from 'react';
import { auth, store } from '../firebase';
import { withAuthorization } from '../components';

const INITIAL_STATE = {
	name: '',
	description: {
		introduction: '',
		recipe: ''
	},
	category: '',
	executionTime: '',
	recomended: false,
	numberOfEntries: 0,
	sourceLink: '',
	products: [],
	error: null,
	author: ''
};

class RecipeAdd extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	onSubmit(e) {
		const { name, description, category, executionTime, recomended, numberOfEntries, sourceLink, products } = this.state;
		const currentUserUID = auth.getCurrentUserUID();
		const addDate = new Date();
		store.doCreateNewRecipe(currentUserUID, {
			name, description, category, executionTime, recomended, numberOfEntries, addDate, sourceLink, products, author: currentUserUID
		})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch(error => {
				this.setState({ error });
			});
		e.preventDefault();
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { name, category, error } = this.state;
		const isInvalid = name === '' || category === '';
		return (
			<div>
				<h1>Add new recipe</h1>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={name}
						placeholder="Recipe name"
						name="name"/>
					<input
						type="text"
						onChange={this.handleInput}
						value={category}
						placeholder="Recipe category"
						name="category"/>
					<button
						type="submit"
						disabled={isInvalid}>
						Add recipe
					</button>
				</form>
				{ error && <p>{error.message}</p> }
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(RecipeAdd);
