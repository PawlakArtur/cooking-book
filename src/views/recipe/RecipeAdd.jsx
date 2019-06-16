import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, store, storage } from '../../firebase';
import { withAuthorization, Button } from '../../components';
import stockPhoto from '../../stock_photo.jpg';

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
	author: '',
	imageProgress: 0,
	photo: null
};

class RecipeAdd extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleMultipleSelect = this.handleMultipleSelect.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.updateProgress = this.updateProgress.bind(this);
		this.completeUploadImage = this.completeUploadImage.bind(this);
	}

	onSubmit(e) {
		const { recomended, numberOfEntries, name, introduction, method, categoryID, executionTime, sourceLink, products, photo } = this.state;
		const currentUserUID = auth.getCurrentUserUID();
		const addDate = new Date();
		store.doCreateNewResource(`recipes/${currentUserUID}`, {
			recomended, numberOfEntries, name, introduction, method, categoryID, executionTime, sourceLink, products, addDate, author: currentUserUID, photo
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

	handleFileUpload(e) {
		const file = e.target.files[0];

		storage.uploadImage(file, { progress: this.updateProgress, complete: this.completeUploadImage });
	}

	completeUploadImage(url) {
		this.setState({ photo: url });
	}

	updateProgress(snapshot) {
		const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		this.setState({ imageProgress: percentage });
	}

	render() {
		const { name, introduction, method, categoryID, executionTime, sourceLink, products, error, imageProgress, photo } = this.state;
		const { categoryList, productList, translate } = this.props;
		const isInvalid = name === '' || categoryID === '';
		const photoPath = photo || stockPhoto;
		return (
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.addNewRecipe')}</h1>
				<main className="layout__main layout__container--background layout__container--no-padding">
					<img src={photoPath} className="recipe-add__photo" alt="product" />
					<form className="layout__container layout__container--form form__container" onSubmit={this.onSubmit}>
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
						<progress
							max="100"
							value={imageProgress}
							id="image-progress"
							className="form__input--progress-bar layout__input--wide"
						/>
						<label htmlFor="recipe-image" className="layout__button button__button">{translate('views.addPhoto')}</label>
						<input
							type="file"
							className="hide"
							id="recipe-image"
							onChange={this.handleFileUpload}
						/>
						<Button
							type="submit"
							cssClass="layout__button"
							disabled={isInvalid}>
							{translate('views.addRecipe')}
						</Button>
					</form>
					{ error && <p>{error.message}</p> }
				</main>
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
