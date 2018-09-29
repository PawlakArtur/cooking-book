import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuthorization } from '../../components';

class ProductList extends Component {
	render() {
		const { productList } = this.props;
		return (
			<div>
				<h1>Product list</h1>
				<ul>
					{productList.map(product =>
						<li key={product.id}>{product.name}</li>
					)}
				</ul>
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(ProductList);

ProductList.propTypes = {
	productList: PropTypes.array
};
