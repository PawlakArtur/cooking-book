import React, { Component } from 'react';
import { store } from '../../firebase';
import { withAuthorization } from '../../components';

const INITIAL_STATE = {
	categories: [],
	error: null
};

class CategoryList extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount() {
		store.getAllCategories()
			.then(snapshot => {
				const categories = Object.keys(snapshot.val()).map(categoryID => Object.assign(snapshot.val()[categoryID], { categoryID }));
				this.setState({ categories });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { error, categories } = this.state;
		return (
			<div>
				<h1>Categories list:</h1>
				<ul>
					{categories.map(category =>
						<li key={category.categoryID}>{category.name}</li>
					)}
				</ul>
				{ error && <p>{error.messages}</p>}
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(CategoryList);
