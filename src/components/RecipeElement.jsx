import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';

class RecipeElement extends Component {
	constructor() {
		super();
		this.state = {
			showRemoveButtons: false
		};

		this.toggleConfirmationButtons = this.toggleConfirmationButtons.bind(this);
		this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
	}

	toggleConfirmationButtons() {
		this.setState(prevState => ({ showRemoveButtons: !prevState.showRemoveButtons }));
	}

	handleRemoveRecipe(id) {
		this.toggleConfirmationButtons();
		this.removeRecipeTimeout = setTimeout(() => {
			this.props.removeRecipe(id);
		}, 300);
	}

	render() {
		const { recipe } = this.props;
		const { showRemoveButtons } = this.state;
		const cateogryName = this.props.categoryList.find(cateogry => cateogry.id === recipe.categoryID).name;
		return <li className="recipe__element">
			<div className="recipe__container">
				<div className="recipe__image"></div>
				<div className="recipe__information">
					<h2 className="recipe__title"><Link className="recipe__link" to={`/recipeDetails/${recipe.id}`}>{recipe.name}</Link></h2>
					<p className="recipe__executionTime">Execution time: {recipe.executionTime}</p>
					<p className="recipe__category">Category: {cateogryName}</p>
				</div>
				<div className="recipe__buttons">
					<Button
						actionFunction={this.toggleConfirmationButtons.bind(this, true)}>
						Delete
					</Button>
				</div>
			</div>
			<CSSTransition
				in={showRemoveButtons}
				timeout={300}
				classNames="recipe__confirmation"
				unmountOnExit>
				<div className="recipe__confirmation">
					<p className="confirmation__title">Remove element?</p>
					<Button
						actionFunction={this.toggleConfirmationButtons}>
						No
					</Button>
					<Button
						actionFunction={this.handleRemoveRecipe.bind(this, recipe.id)}>
						Yes
					</Button>
				</div>
			</CSSTransition>
		</li>;
	}
}

export default RecipeElement;

RecipeElement.propTypes = {
	categoryList: PropTypes.array.isRequired,
	recipe: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		executionTime: PropTypes.string,
		categoryID: PropTypes.string
	}).isRequired,
	removeRecipe: PropTypes.func.isRequired
};
