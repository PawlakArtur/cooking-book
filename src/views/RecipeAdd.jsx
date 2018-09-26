import React, { Component } from 'react';
import { auth, store } from '../firebase';
import { withAuthorization } from '../components';

const INITIAL_STATE = {
	name: '',
	recipeIntroduction: '',
	recipeSteps: [ '' ],
	categoryName: '',
	categoryID: '',
	executionTime: '',
	recomended: false,
	numberOfEntries: 0,
	sourceLink: '',
	products: [],
	error: null,
	author: '',
	allCategories: [],
	allProducts: []
};

class RecipeAdd extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleMultipleSelect = this.handleMultipleSelect.bind(this);
		this.handleStepInputs = this.handleStepInputs.bind(this);
	}

	componentDidMount() {
		store.getAllCategories()
			.then(snapshot => {
				this.setState({
					allCategories: Object.keys(snapshot.val()).map(key => ({ id: key, name: snapshot.val()[key] }))
				});
			}).catch(error => {
				this.setState({ error });
			});
		store.getAllProducts()
			.then(snapshot => {
				this.setState({
					allProducts: Object.keys(snapshot.val()).map(key => ({ id: key, name: snapshot.val()[key] }))
				});
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	onSubmit(e) {
		const { recomended, numberOfEntries, name, recipeIntroduction, recipeSteps, categoryID, executionTime, sourceLink, products } = this.state;
		const currentUserUID = auth.getCurrentUserUID();
		const addDate = new Date();
		store.doCreateNewRecipe(currentUserUID, {
			recomended, numberOfEntries, name, recipeIntroduction, recipeSteps, categoryID, executionTime, sourceLink, products, addDate, author: currentUserUID
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

	handleMultipleSelect(e) {
		const selectedOptionsArray = Array.from(e.target.selectedOptions);
		this.setState({ [e.target.name]: selectedOptionsArray.map(option => option.value) });
	}

	handleStepInputs(index, e) {
		const recipeStep = e.target.value;
		this.setState(prevState => {
			prevState.recipeSteps[index] = recipeStep;
			return {
				recipeSteps: prevState.recipeSteps
			};
		});
	}

	render() {
		const { name, recipeIntroduction, recipeSteps, categoryID, executionTime, sourceLink, products, error, allCategories, allProducts } = this.state;
		const isInvalid = name === '' || categoryID === '';
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
					<select
						onChange={this.handleInput}
						value={categoryID}
						placeholder="Recipe category"
						name="categoryID">
						<option>--Please choose an option--</option>
						{ allCategories.map(category =>
							<option key={category.id} value={category.id}>{category.name}</option>
						)}
					</select>
					<select
						onChange={this.handleMultipleSelect}
						value={products}
						placeholder="Recipe products"
						name="products"
						multiple>
						<option>--Please choose an options--</option>
						{ allProducts.map(product =>
							<option key={product.id} value={product.id}>{product.name}</option>
						)}
					</select>
					<input
						type="number"
						onChange={this.handleInput}
						value={executionTime}
						placeholder="Recipe execution time"
						name="executionTime"/>
					<textarea
						onChange={this.handleInput}
						value={recipeIntroduction}
						placeholder="Recipe introduction"
						name="recipeIntroduction"/>
					{ recipeSteps.map((step, index) =>
						<textarea
							key={`step-${index}`}
							onChange={this.handleStepInputs.bind(this, index)}
							value={recipeSteps[index]}
							placeholder={`Step ${index + 1}`}
							name="step"/>
					)}
					<input
						type="text"
						onChange={this.handleInput}
						value={sourceLink}
						placeholder="Recipe source link"
						name="sourceLink"/>
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
