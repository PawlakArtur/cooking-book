import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, store } from '../../firebase';
import { withAuthorization, Button } from '../../components';

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
		store.doCreateNewResource(`recipes/${currentUserUID}`, {
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
		const { categoryList, productList, translate } = this.props;
		const isInvalid = name === '' || categoryID === '';
		return (
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.addNewRecipe')}</h1>
				<form className="layout__main layout__container layout__container--form form__container" onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={name}
						placeholder={translate('views.recipeName')}
						name="name"/>
					<select
						onChange={this.handleInput}
						value={categoryID}
						placeholder={translate('views.categoryName')}
						name="categoryID">
						<option>--{translate('views.chooseCategory')}--</option>
						{ categoryList.map(category =>
							<option key={category.id} value={category.id}>{category.name}</option>
						)}
					</select>
					<select
						onChange={this.handleMultipleSelect}
						value={products}
						placeholder="Recipe products"
						name={translate('views.productName')}
						multiple>
						<option>--{translate('views.productName')}--</option>
						{ productList.map(product =>
							<option key={product.id} value={product.id}>{product.name}</option>
						)}
					</select>
					<input
						type="number"
						onChange={this.handleInput}
						value={executionTime}
						placeholder={translate('views.executionTime')}
						name="executionTime"/>
					<textarea
						onChange={this.handleInput}
						value={introduction}
						placeholder={translate('views.recipeIntroduction')}
						name="introduction"
						className="layout__input--wide"/>
					<Button
						cssClass="layout__button"
						disabled={isInvalid}
						actionFunction={this.addNewStep}>
						{translate('views.addNewStep')}
					</Button>
					{ steps.map((step, index) =>
						<textarea
							key={`step-${index}`}
							onChange={this.handleStepInputs.bind(this, index)}
							value={steps[index]}
							placeholder={`${translate('views.step')} ${index + 1}`}
							name="step"
							className="layout__input--wide"/>
					)}
					<input
						type="text"
						onChange={this.handleInput}
						value={sourceLink}
						placeholder={translate('views.recipeSourceLink')}
						name="sourceLink"/>
					<Button
						type="submit"
						cssClass="layout__button"
						disabled={isInvalid}>
						{translate('views.addRecipe')}
					</Button>
				</form>
				{ error && <p>{error.message}</p> }
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(RecipeAdd);

RecipeAdd.propTypes = {
	categoryList: PropTypes.array.isRequired,
	productList: PropTypes.array.isRequired,
	translate: PropTypes.func.isRequired
};
