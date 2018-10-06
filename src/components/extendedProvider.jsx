import React from 'react';
import { firebase, store } from '../firebase';
import AuthUserContext from './AuthUserContext';
import DataContext from './DataContext';

const extendedProvider = Component => {
	class ExtendedProvider extends React.Component {
		constructor() {
			super();
			this.state = {
				authUser: null,
				productList: [],
				categoryList: []
			};
		}

		componentDidMount() {
			firebase.auth.onAuthStateChanged(authUser => {
				authUser
					? this.setState({ authUser })
					: this.setState({ authUser: null });
			});

			store.listenForResource('products', snapshot => {
				const productsKeys = Object.keys(snapshot.val());
				const productsMap = snapshot.val();
				const productList = productsKeys.map(productID => Object.assign(productsMap[productID], { id: productID }));
				this.setState({ productList });
			});

			store.listenForResource('categories', snapshot => {
				const categoriesKeys = Object.keys(snapshot.val());
				const categoriesMap = snapshot.val();
				const categoryList = categoriesKeys.map(productID => Object.assign(categoriesMap[productID], { id: productID }));
				this.setState({ categoryList });
			});
		}

		render() {
			const { authUser, productList, categoryList } = this.state;
			return (
				<AuthUserContext.Provider value={authUser}>
					<DataContext.Provider value={({ productList, categoryList })}>
						<Component/>
					</DataContext.Provider>
				</AuthUserContext.Provider>
			);
		}
	}

	return ExtendedProvider;
};

export default extendedProvider;
