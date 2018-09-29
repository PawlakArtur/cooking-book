import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, store } from '../../firebase';
import { withAuthorization } from '../../components';

const INITIAL_STATE = {
	name: '',
	introduction: '',
	steps: [ '' ],
	categoryName: '',
	categoryID: '',
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
		this.handleMultipleSelect = this.handleMultipleSelect.bind(this);
		this.handleStepInputs = this.handleStepInputs.bind(this);
		this.addNewStep = this.addNewStep.bind(this);
	}

	onSubmit(e) {
		const { recomended, numberOfEntries, name, introduction, steps, categoryID, executionTime, sourceLink, products } = this.state;
		const currentUserUID = auth.getCurrentUserUID();
		const addDate = new Date();
		store.doCreateNewRecipe(currentUserUID, {
			recomended, numberOfEntries, name, introduction, steps, categoryID, executionTime, sourceLink, products, addDate, author: currentUserUID
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
			prevState.steps[index] = recipeStep;
			return {
				steps: prevState.steps
			};
		});
	}

	addNewStep() {
		this.setState(prevState => ({ steps: [ ...prevState.steps, '' ]}));
	}

	render() {
		const { name, introduction, steps, categoryID, executionTime, sourceLink, products, error } = this.state;
		const { categoryList, productList } = this.props;
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
						{ categoryList.map(category =>
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
						{ productList.map(product =>
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
						value={introduction}
						placeholder="Recipe introduction"
						name="introduction"/>
					{ steps.map((step, index) =>
						<textarea
							key={`step-${index}`}
							onChange={this.handleStepInputs.bind(this, index)}
							value={steps[index]}
							placeholder={`Step ${index + 1}`}
							name="step"/>
					)}
					<button
						type="button"
						onClick={this.addNewStep}>
						Add new step
					</button>
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

RecipeAdd.propTypes = {
	categoryList: PropTypes.array,
	productList: PropTypes.array
};
