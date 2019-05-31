import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, store } from '../../firebase';
import { withAuthorization, Button } from '../../components';

const INITIAL_STATE = {
	name: '',
	introduction: '',
	method: '',
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
	}

	onSubmit(e) {
		const { recomended, numberOfEntries, name, introduction, method, categoryID, executionTime, sourceLink, products } = this.state;
		const currentUserUID = auth.getCurrentUserUID();
		const addDate = new Date();
		store.doCreateNewResource(`recipes/${currentUserUID}`, {
			recomended, numberOfEntries, name, introduction, method, categoryID, executionTime, sourceLink, products, addDate, author: currentUserUID
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

	render() {
		const { name, introduction, method, categoryID, executionTime, sourceLink, products, error } = this.state;
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
						name="name"
						className="form__input"/>
					<select
						onChange={this.handleInput}
						value={categoryID}
						placeholder={translate('views.categoryName')}
						name="categoryID"
						className="form__input">
						<option>--{translate('views.chooseCategory')}--</option>
						{ categoryList.map(category =>
							<option key={category.id} value={category.id}>{category.name}</option>
						)}
					</select>
					<select
						onChange={this.handleMultipleSelect}
						value={products}
						placeholder="translate('views.productName')"
						name="products"
						multiple
						className="form__input">
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
						name="executionTime"
						className="form__input"/>
					<textarea
						onChange={this.handleInput}
						value={introduction}
						placeholder={translate('views.recipeIntroduction')}
						name="introduction"
						className="form__input layout__input--wide"/>
					<textarea
						onChange={this.handleInput}
						value={method}
						placeholder={translate('views.recipeMethod')}
						name="method"
						className="form__input layout__input--wide layout__input--height" />
					<input
						type="text"
						onChange={this.handleInput}
						value={sourceLink}
						placeholder={translate('views.recipeSourceLink')}
						name="sourceLink"
						className="form__input"/>
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
