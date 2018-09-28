import React, { Component } from 'react';
import { store } from '../../firebase';
import { withAuthorization } from '../../components';

const INITIAL_STATE = {
	products: [],
	error: null
};

class ProductList extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount() {
		store.getAllProducts()
			.then(snapshot => {
				const products = Object.keys(snapshot.val()).map(productID => Object.assign(snapshot.val()[productID], { productID: productID }));
				this.setState({ products });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { products, error } = this.state;
		return (
			<div>
				<h1>Product list</h1>
				<ul>
					{products.map(product =>
						<li key={product.productID}>{product.name}</li>
					)}
				</ul>
				{error && <p>{error.message}</p>}
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(ProductList);
