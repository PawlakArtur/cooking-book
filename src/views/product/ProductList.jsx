import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuthorization, Button } from '../../components';

class ProductList extends Component {
	render() {
		const { productList, translate } = this.props;
		return (
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.productList')}</h1>
				<div className="layout__buttons">
					<Button
						cssClass="button__link--primary"
						to="/productAdd"
						linkButton>
						{translate('views.addProduct')}
					</Button>
				</div>
				<ul className="layout__main">
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
	productList: PropTypes.array.isRequired,
	translate: PropTypes.func.isRequired
};
