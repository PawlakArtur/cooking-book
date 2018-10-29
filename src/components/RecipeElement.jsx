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
		const { recipe, translate } = this.props;
		const { showRemoveButtons } = this.state;
		const cateogryName = this.props.categoryList.find(cateogry => cateogry.id === recipe.categoryID).name;
		return <li className="recipe__element">
			<div className="recipe__container">
				<div className="recipe__image"></div>
				<div className="recipe__information">
					<h2 className="recipe__title"><Link className="recipe__link" to={`/recipeDetails/${recipe.id}`}>{recipe.name}</Link></h2>
					<p className="recipe__executionTime">{translate('views.executionTime')}: {recipe.executionTime}</p>
					<p className="recipe__category">{translate('views.category')}: {cateogryName}</p>
				</div>
				<div className="recipe__buttons">
					<CSSTransition
						in={showRemoveButtons}
						timeout={300}
						classNames="recipe__removeButton">
						<Button
							cssClass="recipe__removeButton"
							actionFunction={this.toggleConfirmationButtons.bind(this, true)}>
							{translate('shared.remove')}
						</Button>
					</CSSTransition>
					<CSSTransition
						in={showRemoveButtons}
						timeout={300}
						classNames="recipe__confirmation"
						unmountOnExit>
						<div className="recipe__confirmation">
							<Button
								cssClass="button__button--primary"
								actionFunction={this.handleRemoveRecipe.bind(this, recipe.id)}>
								{translate('shared.yes')}
							</Button>
							<Button
								actionFunction={this.toggleConfirmationButtons}>
								{translate('shared.no')}
							</Button>
						</div>
					</CSSTransition>
				</div>
			</div>
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
	removeRecipe: PropTypes.func.isRequired,
	translate: PropTypes.func.isRequired
};
