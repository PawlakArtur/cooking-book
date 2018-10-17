import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, store } from '../../firebase';
import { withAuthorization } from '../../components';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
	recipe: {},
	error: null
};

class RecipeDetails extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount() {
		const currentUserUID = auth.getCurrentUserUID();
		const { match: { params: { recipeID }}} = this.props;
		store.getResource(`recipes/${currentUserUID}/${recipeID}`)
			.then(snapshot => {
				this.setState({ recipe: snapshot.val() });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { recipe: { categoryID, executionTime, name, numberOfEntries, products, introduction, steps, recomended, sourceLink }} = this.state;
		const { translate } = this.props;
		return (
			<div>
				<div>
					<Link to="/recipes">{translate('shared.backToList')}</Link>
				</div>
				<h1>{translate('views.recipe')}: {name}</h1>
				<p>{executionTime}</p>
				<p>{categoryID}</p>
				<p>{numberOfEntries}</p>
				<p>{recomended}</p>
				<p>{sourceLink}</p>
				<ul>
					{products && products.map((product, index) =>
						<li key={`product-${index}`}>{product}</li>
					)}
				</ul>
				<p>{introduction}</p>
				<ul>
					{steps && steps.map((step, index) =>
						<li key={`step-${index}`}>{step}</li>
					)}
				</ul>
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(RecipeDetails);

RecipeDetails.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			recipeID: PropTypes.string
		})
	}),
	translate: PropTypes.func.isRequired
};
