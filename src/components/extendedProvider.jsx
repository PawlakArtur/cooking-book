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
				categoryList: [],
				userSettings: {}
			};

			this.setUserData = this.setUserData.bind(this);
		}

		componentDidMount() {
			firebase.auth.onAuthStateChanged(this.setUserData);

			store.listenForResource('products', snapshot => {
				const productList = extractList(snapshot);
				this.setState({ productList });
			});

			store.listenForResource('categories', snapshot => {
				const categoryList = extractList(snapshot);
				this.setState({ categoryList });
			});
		}

		setUserData(authUser) {
			if (authUser) {
				if (this.setState.authUser) {
					store.removeListener(`users/${authUser.uid}`);
				}
				store.listenForResource(`users/${authUser.uid}`, snapshot => {
					this.setState({ userSettings: snapshot.val() });
				});
				this.setState({ authUser });
			} else {
				this.setState({ authUser: null, userSettings: {}});
			}
		}

		render() {
			const { authUser, productList, categoryList, userSettings } = this.state;
			return (
				<AuthUserContext.Provider value={authUser}>
					<DataContext.Provider value={({ productList, categoryList, userSettings })}>
						<Component/>
					</DataContext.Provider>
				</AuthUserContext.Provider>
			);
		}
	}

	return ExtendedProvider;
};

export default extendedProvider;
