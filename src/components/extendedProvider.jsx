import React from 'react';
import { firebase, store } from '../firebase';
import AuthUserContext from './AuthUserContext';
import DataContext from './DataContext';
import { extractList } from '../utils';

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
				const productList = extractList(snapshot);
				this.setState({ productList });
			});

			store.listenForResource('categories', snapshot => {
				const categoryList = extractList(snapshot);
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
